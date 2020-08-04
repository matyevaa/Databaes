module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    function getRecipients(res, mysql, context, complete){
        mysql.pool.query("SELECT orders.recipient_email, GiftCards.name, orders.quantity FROM orders LEFT JOIN recipients ON recipients.recipient_email = orders.recipient_email LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID LEFT JOIN OrderHistory ON OrderHistory.orderID = orders.orderID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.recipients = results;
            complete();
        });
    }
    
  return router;
}();
