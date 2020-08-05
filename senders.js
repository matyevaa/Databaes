module.exports = function(){
    var express = require('express');
    var router = express.Router();



    function getPeople(res, mysql, context, complete){
        mysql.pool.query("SELECT senders.sender_email, GiftCards.name, orders.quantity FROM orders LEFT JOIN OrderHistory ON OrderHistory.orderID = orders.orderID LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID LEFT JOIN senders ON senders.sender_email = OrderHistory.email", function(error, results, fields){
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
        getPeople(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('senders', context);
            }

        }
    });


    return router;
}();
