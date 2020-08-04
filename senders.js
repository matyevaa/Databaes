module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    function getSenders(res, mysql, context, complete){
        mysql.pool.query("SELECT OrderHistory.sender_email as sender_email, GiftCards.name as name, OrderHistory.quantity as quantity FROM OrderHistory LEFT JOIN senders ON senders.sender_email = OrderHistory.sender_email LEFT JOIN orders ON orders.orderID = OrderHistory.orderID LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.senders = results;
            complete();
        });
    }
    
  return router;
}();

