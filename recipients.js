module.exports = function(){
    var express = require('express');
    var router = express.Router();



    function getPeople(res, mysql, context, complete){
        mysql.pool.query("SELECT OrderHistory.orderID, orders.trackerID, orders.recipient_email as email, GiftCards.name, orders.price as amount FROM orders LEFT JOIN recipients ON orders.recipient_email = recipients.recipient_email LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID LEFT JOIN OrderHistory ON OrderHistory.orderID = orders.orderID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipients = results;
            complete();
        });
    }

    /* Find people whose fname starts with a given string in the req */
    function getPeopleWithNameLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT OrderHistory.orderID, orders.trackerID, orders.recipient_email as email, GiftCards.name, orders.price as amount FROM orders LEFT JOIN recipients ON orders.recipient_email = recipients.recipient_email LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID LEFT JOIN OrderHistory ON OrderHistory.orderID = orders.orderID WHERE orders.recipient_email LIKE " + mysql.pool.escape(req.params.s + '%');

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipients = results;
            complete();
        });
    }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleterecipient.js","search_recipients.js"];
        var mysql = req.app.get('mysql');
        getPeople(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('recipients', context);
            }

        }
    });

    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["search_recipients.js"];
        var mysql = req.app.get('mysql');
        getPeopleWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('recipients', context);
            }
        }
    });

     /*Deletes a recipient, gives error 202 after a successful deleting*/
     router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM recipients WHERE recipientID=?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
    

    return router;
}();
