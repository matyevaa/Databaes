module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function dropSenders(res, mysql, context, complete){
        mysql.pool.query("DROP TABLE IF EXISTS `senders`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }
    function createSenders(res, mysql, context, complete){
        mysql.pool.query("CREATE TABLE `senders` (`senderID` INT(11) NOT NULL AUTO_INCREMENT,`sender_email` varchar(255) primary key,UNIQUE(senderID))ENGINE=InnoDB DEFAULT CHARSET=utf8", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }

    function dropRecipients(res, mysql, context, complete){
        mysql.pool.query("DROP TABLE IF EXISTS `recipients`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }
    function createRecipients(res, mysql, context, complete){
        mysql.pool.query("CREATE TABLE `recipients` (`recipientID` INT(11) NOT NULL AUTO_INCREMENT,`recipient_email` varchar(255),CONSTRAINT recipients_pk_1 PRIMARY KEY (`recipient_email`),UNIQUE(recipientID))ENGINE=InnoDB DEFAULT CHARSET=utf8", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }

    
    function dropGiftCards(res, mysql, context, complete){
        mysql.pool.query("DROP TABLE IF EXISTS `GiftCards`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }
    function createGiftCards(res, mysql, context, complete){
        mysql.pool.query("CREATE TABLE `GiftCards` (`giftCardID` INT(11) primary key NOT NULL AUTO_INCREMENT,`name` varchar(255) NOT NULL,`quantity` int(11),UNIQUE(giftCardID))ENGINE=InnoDB DEFAULT CHARSET=utf8", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }

    function dropOrderHistory(res, mysql, context, complete){
        mysql.pool.query("DROP TABLE IF EXISTS `OrderHistory`", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }
    function createOrderHistory(res, mysql, context, complete){
        mysql.pool.query("CREATE TABLE `OrderHistory`(`orderID` int(11) primary key NOT NULL AUTO_INCREMENT,`sender_email` varchar(255),`quantity` int(11) NOT NULL,CONSTRAINT OrderHistory_fk_1 FOREIGN KEY OrderHistory(`sender_email`) REFERENCES senders(`sender_email`),UNIQUE(`orderID`))Engine=InnoDB DEFAULT CHARSET=utf8", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }

    function dropOrders(res, mysql, context, complete){
        mysql.pool.query("DROP TABLE IF EXISTS `orders`;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }
    function createOrders(res, mysql, context, complete){
        mysql.pool.query("CREATE TABLE `orders`(`trackerID` int(11) primary key NOT NULL AUTO_INCREMENT,`orderID` int(11) NOT NULL,`recipient_email` varchar(255),`giftCardID` int(11) NOT NULL,`price` int(11) NOT NULL,CONSTRAINT Orders_fk_1 FOREIGN KEY orders(`orderID`) REFERENCES OrderHistory(`orderID`),CONSTRAINT Orders_fk_2 FOREIGN KEY orders(`giftCardID`) REFERENCES GiftCards(`giftCardID`),CONSTRAINT Orders_fk_3 FOREIGN KEY orders(`recipient_email`) REFERENCES recipients(`recipient_email`),UNIQUE(`trackerID`))ENGINE=InnoDB DEFAULT CHARSET=utf8", function(error, results, fields){
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
        dropOrders(res, mysql, context, complete);
        dropOrderHistory(res, mysql, context, complete);
        dropRecipients(res, mysql, context, complete);
        dropSenders(res, mysql, context, complete);
        dropGiftCards(res, mysql, context, complete);
        createSenders(res, mysql, context, complete);
        createRecipients(res, mysql, context, complete);
        createGiftCards(res, mysql, context, complete);
        createOrderHistory(res, mysql, context, complete);
        createOrders(res, mysql, context, complete);



        function complete(){
            callbackCount++;
            if(callbackCount >= 10){
                res.render('home');
            }

        }
    });


    return router;
}();
