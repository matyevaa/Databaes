module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    function getOrderHistory(res, mysql, context, complete){
        mysql.pool.query("SELECT OrderHistory.orderID, orders.trackerID, OrderHistory.sender_email, orders.recipient_email, OrderHistory.quantity, GiftCards.name FROM OrderHistory LEFT JOIN senders ON OrderHistory.sender_email = senders.sender_email LEFT JOIN orders ON orders.orderID = OrderHistory.orderID LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orderHistory = results;
            complete();
        });
    }
    
  return router;
}(); 
