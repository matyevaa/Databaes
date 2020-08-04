module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    function getGiftCards(res, mysql, context, complete){
      mysql.pool.query("SELECT giftCardID, name FROM GiftCards", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.giftCards  = results;
            complete();
        });
    }
    
    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT OrderHistory.sender_email as sender_email, orders.recipient_email as recipient_email, GiftCards.name as name, OrderHistory.quantity as quantity FROM orders LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID LEFT JOIN OrderHistory ON OrderHistory.orderID = orders.orderID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orders = results;
            complete();
        });
    }
    
  return router;
}(); 
