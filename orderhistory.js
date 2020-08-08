module.exports = function(){
    var express = require('express');
    var router = express.Router();



    function getOrderHistory(res, mysql, context, complete){
        mysql.pool.query("SELECT OrderHistory.orderID as orderID, orders.trackerID as trackerID, OrderHistory.sender_email as sender_email, orders.recipient_email as recipient_email, OrderHistory.quantity as amount, GiftCards.name as name FROM OrderHistory LEFT JOIN senders ON OrderHistory.sender_email = senders.sender_email LEFT JOIN orders ON orders.orderID = OrderHistory.orderID LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.OrderHistory = results;
            complete();
        });
    }

    /* Find OrderHistory whose fname starts with a given string in the req */
    function getOrderHistoryByOrderID(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT OrderHistory.orderID as orderID, orders.trackerID as trackerID, OrderHistory.sender_email as sender_email, orders.recipient_email as recipient_email, OrderHistory.quantity as amount, GiftCards.name as name FROM OrderHistory LEFT JOIN senders ON OrderHistory.sender_email = senders.sender_email LEFT JOIN orders ON orders.orderID = OrderHistory.orderID LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID WHERE OrderHistory.orderID LIKE " + mysql.pool.escape(req.params.s + '%');
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.OrderHistory = results;
            complete();
        });
    }
    /*Display all OrderHistory. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["search_orderhistory.js"];
        var mysql = req.app.get('mysql');
        getOrderHistory(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('orderhistory', context);
            }

        }
    });

    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["search_orderhistory.js"];
        var mysql = req.app.get('mysql');
        getOrderHistoryByOrderID(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('orderhistory', context);
            }
        }
    });


    return router;
}();
