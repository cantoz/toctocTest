const config = require('config');
var os = require("os");
var db = require("./database.js");
var EventEmitter = require("events").EventEmitter;

var ee = new EventEmitter();
var MIN_DISCONNECT = config.get("EVENTEMITTER.MIN_DISCONNECT");
var ADD_INTERVAL = config.get("EVENTEMITTER.ADD_INTERVAL");

// Event Emitter
ee.once('connect', () => {
    console.log('Is connected!');
    setInterval(() => {
        ee.emit('addMetric');
    }, ADD_INTERVAL);
    setTimeout(() => {
        ee.emit('disconnect');
    }, MIN_DISCONNECT * 60000);
});
ee.on('disconnect', () => {
    ee.removeAllListeners('connect');
    ee.removeAllListeners('addMetric');
    ee.removeAllListeners('removeMetric');
    console.log('Is disconnected!');
});
ee.on('addMetric', async () => {
    var hostData = {
        hostname: os.hostname(),
        memory_usage: os.freemem(),
        timestamp: Date.now()
    };

    var insert = 'INSERT INTO memory (hostname, memory_usage, timestamp) VALUES (?,?,?)'
    db.run(insert, [os.hostname(), os.freemem(), Date.now()])
    console.log('Metric added!', hostData.memory_usage);
});
ee.on('removeMetric', () => {
    console.log('Metric removed!');
});

module.exports = ee;