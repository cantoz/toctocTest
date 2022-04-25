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
app.get("/get/resource/memory/:minutes", (req, res) => {
    var minutes = [req.params.minutes]

    var now = minutes === 30 ? Date.now() : Date.now() - (minutes * 6000);
    var before = now - (30 * 60000);

    var sql = "SELECT * FROM memory WHERE timestamp BETWEEN " + before + " AND " + now
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

// === GET ALL BRANCHES BY BANK ===
app.get("/get/bank/branches/", (req, res) => {
    var sql = `SELECT 
        bk.name as 'Banco',
        br.address as 'Sucursal'
        FROM bank bk
        LEFT JOIN branch_office br
        ON bk.id = br.bank_id`
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

// === GET ALL REPORTS FROM ONE VIGILANTE ===
app.get("/get/vigilante/reports/:vigilante", (req, res) => {
    var vigilante_id = [req.params.vigilante]
    var sql = `SELECT 
    e.name as 'Vigilante',
    r.description as 'Descripcion',
    r.date as 'Fecha'
    FROM vigilante v LEFT JOIN report r ON r.vigilante_id = v.id
    LEFT JOIN employee e ON e.id = v.employee_id
    WHERE v.id = ` + vigilante_id + ``
    // ON r.vigilante_id = ` + vigilante_id
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

// === EMPLOYEES BY BANK ===
app.get("/get/bank/employees", (req, res) => {
    var sql = `SELECT 
        bk.name as 'BANCO',
        COUNT(e.id) as 'Empleados'
        FROM bank bk
        INNER JOIN branch_office br ON bk.id = br.bank_id
        INNER JOIN employment em ON br.id = em.branch_id
        INNER JOIN employee e ON em.employee_id = e.id
        GROUP BY br.address`
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

// === ALL EMPLOYEES THAT ARE VIGILANTE ===
app.get("/get/employees/get-vigilante", (req, res) => {
    var sql = `SELECT 
        e.name as 'Empleado'
        FROM vigilante v
        INNER JOIN employee e ON e.id = v.employee_id`
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

// === ALL REGISTRATION BY EMPLOYEE ===
app.get("/get/employees/get-registration/:id", (req, res) => {
    var employee_id = [req.params.id]
    var sql = `SELECT 
        e.name as 'Empleado',
        reg.type as 'Tipo',
        reg.time as 'Fecha'
        FROM register reg
        LEFT JOIN registration regis ON reg.id = regis.register_id
        LEFT JOIN employee e ON regis.employee_id = e.id
        WHERE e.id = ` + employee_id
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


// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});