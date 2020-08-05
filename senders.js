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
        console.log(req.body)
        var mysql = req.app.get('mysql');
        
        var email = req.body.email;
        var name = req.body.name;
        var amount = req.body.amount;
        var sql = "INSERT IGNORE INTO `senders` (`sender_email`) VALUES (?);";
        var sql2 = "INSERT IGNORE INTO `GiftCards` (`name`) VALUES (?);";
        var sql3 = "INSERT IGNORE INTO `orders` (`price`) VALUES (?)";
        
        var inserts = [email];
        var inserts2 = [name];
        var inserts3 = [amount];
        
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){    
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
            }
        });
        
        sql2 = mysql.pool.query(sql2,inserts2,function(error, results, fields){    
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
            }
        });
        
        sql3 = mysql.pool.query(sql3,inserts3,function(error, results, fields){    
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
