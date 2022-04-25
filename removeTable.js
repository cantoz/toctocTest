const sqlite = require('sqlite3').verbose();
var db = require("./database.js");

db.run('DROP TABLE memory', function(err){
    if(err){
        console.log(err.message);
    }
    console.log('Memory Table deleted!');
});

db.run('DROP TABLE bank', function(err){
    if(err){
        console.log(err.message);
    }
    console.log('Bank Table deleted!');
});

db.run('DROP TABLE employee', function(err){
    if(err){
        console.log(err.message);
    }
    console.log('Employee Table deleted!');
});

db.run('DROP TABLE register', function(err){
    if(err){
        console.log(err.message);
    }
    console.log('Register Table deleted!');
});

db.run('DROP TABLE vigilante', function(err){
    if(err){
        console.log(err.message);
    }
    console.log('Vigilante Table deleted!');
});

db.run('DROP TABLE report', function(err){
    if(err){
        console.log(err.message);
    }
    console.log('Report Table deleted!');
});

db.run('DROP TABLE branch_office', function(err){
    if(err){
        console.log(err.message);
    }
    console.log('Branch Table deleted!');
});

db.run('DROP TABLE employment', function(err){
    if(err){
        console.log(err.message);
    }
    console.log('Employment Table deleted!');
});

db.run('DROP TABLE registration', function(err){
    if(err){
        console.log(err.message);
    }
    console.log('Registration Table deleted!');
});

db.close();