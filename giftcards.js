module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getGiftCards(res, mysql, context, complete){
        mysql.pool.query("SELECT name, quantity FROM GiftCards", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.giftcards = results;
            complete();
        });
    }

    //display giftcards
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getGiftCards(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('giftcards', context);
            }

        }
    });
    
  /* Adds a giftcard, redirects to the GiftCards page after adding */
    router.post('/', function(req, res){
        console.log(req.body.homeworld)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO GiftCards (name, quantity) VALUES (?,?)";
        var inserts = [req.body.name, req.body.amount];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/giftcards');
            }
        });
    });


    return router;
}();
