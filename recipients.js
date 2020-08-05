module.exports = function(){
    var express = require('express');
    var router = express.Router();



    function getRecipients(res, mysql, context, complete){
        mysql.pool.query("SELECT OrderHistory.orderID, orders.trackerID, orders.recipient_email as email, GiftCards.name, orders.price as amount FROM orders LEFT JOIN recipients ON orders.recipient_email = recipients.recipient_email LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID LEFT JOIN OrderHistory ON OrderHistory.orderID = orders.orderID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipients = results;
            complete();
        });
    }

    /*Display all recipients. Requires web based javascript to delete recipients with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getRecipients(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('recipients', context);
            }
        }
    });

    /*Adds a recipient, redirects to the recipients page after adding */
    router.post('/', function(req, res){
        console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = /*"INSERT INTO recipients () VALUES (?)"*/;
        var inserts = [req.body.orderID, req.body.email, req.body.name, req.body.amount];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/recipients');
            }
        });
    });

    return router;
}();
