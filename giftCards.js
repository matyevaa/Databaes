module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    function getGiftCards(res, mysql, context, complete){
        mysql.pool.query("SELECT name, quantity, price, giftCardID FROM GiftCards", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.giftCards = results;
            complete();
        });
    }
    
  return router;
}(); 
