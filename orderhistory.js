module.exports = function(){
    var express = require('express');
    var router = express.Router();



    function getPeople(res, mysql, context, complete){
        mysql.pool.query("SELECT OrderHistory.orderID as orderID, orders.trackerID as trackerID, OrderHistory.sender_email as sender_email, orders.recipient_email as recipient_email, OrderHistory.quantity as quantity, GiftCards.name as name FROM OrderHistory LEFT JOIN senders ON OrderHistory.sender_email = senders.sender_email LEFT JOIN orders ON orders.orderID = OrderHistory.orderID LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }
    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPeople(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('orderhistory', context);
            }

        }
    });


    return router;
}();
