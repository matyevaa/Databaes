module.exports = function(){
    var express = require('express');
    var router = express.Router();

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

    /*Display all recipients. Requires web based javascript to delete recipients with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getRecipients(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('recipients', context);
            }
        }
    });

     /*Adds a recipient, redirects to the recipients page after adding */
    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        
        var email = req.body.email;
        var name = req.body.name;
        var amount = req.body.amount;
        var orderID = req.body.orderID;
        
        var sql = "INSERT IGNORE INTO `senders` (`sender_email`) VALUES (?);";
        var sql2 = "INSERT IGNORE INTO `GiftCards` (`name`) VALUES (?);";
        var sql3 = "INSERT IGNORE INTO `orders` (`price`) VALUES (?);";
        var sql4 = "INSERT IGNORE INTO `OrderHistory` (`orderID`) VALUES (?)";
        
        var inserts = [email];
        var inserts2 = [name];
        var inserts3 = [amount];
        var inserts4 = [orderID];
        
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
            }
        });
        
        sql4 = mysql.pool.query(sql4,inserts4,function(error, results, fields){    
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
              res.redirect('/recipients');
            }
        });    
    });
    
    return router;
}();
