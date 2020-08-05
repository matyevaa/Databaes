module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getSenders(res, mysql, context, complete){
        mysql.pool.query("SELECT senders.sender_email as email, GiftCards.name, orders.price as amount FROM orders LEFT JOIN OrderHistory ON OrderHistory.orderID = orders.orderID LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID LEFT JOIN senders ON senders.sender_email = OrderHistory.sender_email", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.senders = results;
            complete();
        });
    }
    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getSenders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('senders', context);
            }

        }
    });
        
      /*Adds a sender, redirects to the senders page after adding */
    router.post('/', function(req, res){
        console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = /*"INSERT INTO senders (sender_email) VALUES (?); INSERT INTO GiftCards (name) VALUES (?); INSERT INTO orders (price) VALUES (?)"*/;
        var inserts = [req.body.email, req.body.name, req.body.amount];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/senders');
            }
        });
    });


    return router;
}();
