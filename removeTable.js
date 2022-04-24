const sqlite = require('sqlite3').verbose();
var db = require("./database.js");

db.run('DROP TABLE memory', function(err){
    if(err){
        console.log(err.message);
    }
    console.log('Table deleted!');
});

db.close();