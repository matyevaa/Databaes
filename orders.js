module.exports = function(){
    var express = require('express');
    var router = express.Router();



    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT OrderHistory.orderID, orders.trackerID, OrderHistory.sender_email as sender_email, orders.recipient_email as recipient_email, GiftCards.name, orders.price as amount FROM orders LEFT JOIN OrderHistory ON orders.orderID = OrderHistory.orderID LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }

    function getOrderID(res, mysql, context, complete){
        mysql.pool.query("SELECT orderID FROM OrderHistory ORDER BY orderID DESC LIMIT 1", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.orderID = results;
            complete();
        });
    }

    function getGiftCardID(giftCard, res, mysql, context, complete){
        var giftCard = "SELECT giftCardID FROM GiftCards WHERE name='" + String(giftCard) + "' ORDER BY giftCardID DESC LIMIT 1"
        mysql.pool.query(giftCard, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.giftCardID = results;
            complete();
        });
    }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getOrders(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('orders', context);
            }

        }
    });

    router.post('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        console.log(req.body)
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        var sEmail = req.body.sEmail;
        var rEmail = req.body.rEmail;
        var giftCard = req.body.giftCard;
        var amount = req.body.Amount;
        var sql = "INSERT IGNORE INTO `senders` (`sender_email`) VALUES (?);";
        var sql2 = "INSERT IGNORE INTO `recipients` (`recipient_email`) VALUES (?)";
        var sql3 = "INSERT IGNORE INTO  `GiftCards` (`name`, quantity) VALUES (?, 100)";
        var sql4 = "INSERT INTO  `OrderHistory` (`sender_email`, quantity) VALUES (?, 1)";
        var sql5 = "INSERT INTO `orders` (`orderID`, `recipient_email`, `giftCardID`, `price`) VALUES (?, ?, ?, ?);";
        var inserts = [sEmail];
        var inserts2 = [rEmail];
        var inserts3 = [giftCard];
        var inserts4 = [sEmail];
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
            }
        });

        getOrderID(res, mysql, context, complete);
        getGiftCardID(giftCard, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                var orderID = context.orderID[0].orderID;
                var giftCardID = context.giftCardID[0].giftCardID;
                console.log(orderID, giftCardID)
                var inserts5 = [orderID, rEmail, giftCardID, amount];
                sql5 = mysql.pool.query(sql5,inserts5,function(error, results, fields){
                    if(error){
                        console.log(JSON.stringify(error))
                        res.write(JSON.stringify(error));
                        res.end();
                    }else{
                    }
                });
                res.render('orders', context);
            }

        }
    });


    return router;
}();
