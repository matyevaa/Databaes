module.exports = function(){
    // utilize express and router for routes
    var express = require('express');
    var router = express.Router();

    // used to get the giftCard id, name and quantity from the GiftCards table
    function getGiftCards(res, mysql, context, complete){
        mysql.pool.query("SELECT giftCardID as id, name, quantity FROM GiftCards", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.giftcards = results;
            complete();
        });
    }
    
    // a separate query to also get the giftCard id, name and quantity from GiftCards table
    function getGiftCard(res, mysql, context, id, complete){
        var sql = "SELECT giftCardID as id, name, quantity FROM GiftCards WHERE giftCardID=?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.giftcard = results[0];
            complete();
        });
    }

    // run the select for the GiftCards page and display the results in a table
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletegiftcard.js"];
        var mysql = req.app.get('mysql');
        getGiftCards(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('giftcards', context);
            }

        }
    });
    
    // Adds a giftcard, redirects to the GiftCards page after adding
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO GiftCards (name, quantity) VALUES (?,?)";
        var inserts = [req.body.name, req.body.quantity];
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
    
    // Display one giftcard for the specific purpose of updating giftcards
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updategiftcard.js"];
        var mysql = req.app.get('mysql');
        getGiftCard(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-giftcard', context);
            }

        }
    });
    
    // The URI that update data is sent to in order to update a giftcard
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE GiftCards SET name=?, quantity=? WHERE giftCardID=?";
        var inserts = [req.body.name, req.body.quantity, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });
    
    // Route to delete a giftcard, simply returns a 202 upon success. Ajax will handle this.
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM GiftCards WHERE giftCardID = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })
    

    return router;
}();
