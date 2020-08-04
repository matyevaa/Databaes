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
    
     /*Adds a giftcard*/
    router.post('/', function(req, res){
        console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO GiftCards (name, quantity, price) VALUES (?,?,?)";
        var inserts = [req.body.name, req.body.quantity, req.body.price];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/giftCards');
            }
        });
    });

    
    
  return router;
}(); 
