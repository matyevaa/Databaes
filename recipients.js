module.exports = function(){
    var express = require('express');
    var router = express.Router();


    // get the orderID, trackerID, Recipient Email, Gift Card name, and amount from every order placed
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

    // get the order info for specifically the recipient entered in the search
    function getRecipientsSearch(req, res, mysql, context, complete) {
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


    // get and display the order info in a table on the page
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleterecipient.js","search_recipients.js"];
        var mysql = req.app.get('mysql');
        getRecipients(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('recipients', context);
            }

        }
    });

    //get and display the order info of the recipient searched on the page
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["search_recipients.js"];
        var mysql = req.app.get('mysql');
        getRecipientsSearch(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('recipients', context);
            }
        }
    });



    return router;
}();
