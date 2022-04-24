// Create express app
var ee = require("./agent.js");
var express = require("express");
var db = require("./database.js");
var cors = require('cors')
var app = express();
app.use(cors());

// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
    ee.emit('connect');
});

// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

// Insert here other API endpoints
//
// === GET MEMORY ===
app.get("/get/resource/memory", (req, res) => {
    var sql = "select * from memory"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log('ERROR!');
            res.status(400).json({ "error": err.message });
            return;
        }
        var data = {
            "message": "success",
            "data": rows
        };
        res.status(200).json(data);
    });
});
// === POST MEMORY ===
app.post("/get/resource/memory", (req, res, next) => {
    console.log('REQUEST', req);
    var errors = []
    var data = {
        hostname: req.body.hostname,
        memory_usage: req.body.memory_usage,
        timestamp: req.body.timestamp
    }
    var sql = 'INSERT INTO memory (hostname, memory_usage, timestamp) VALUES (?,?,?,?)'
    var params = [data.hostname, data.memory_usage, data.timestamp]
    db.run(sql, params, function (err, result) {
        if (err) {
            // res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});