var sqlite3 = require('sqlite3')
var md5 = require('md5')

const DBSOURCE = "db.sqlite"
const randomDate = () => {
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * maxDate);
    return new Date(timestamp);
}

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        // == CREATING MEMORY TABLE FOR EXERCISE 3 AND 4 ===
        db.run(`CREATE TABLE memory (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                hostname TEXT, 
                memory_usage INTEGER, 
                timestamp DATETIME
                )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.info('Table already created');
                } else {
                    // Table just created, creating some rows
                    console.info('Table just created, creating some rows');
                    var insert = 'INSERT INTO memory (hostname, memory_usage, timestamp) VALUES (?,?,?)'
                }
            });
        // === CREATING DATABASE FOR EXERCISE 1 ===
        
        // BANK TABLE
        db.run(`CREATE TABLE bank (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
            )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.info('Bank Oops!', err.message);
                } else {
                    // Table just created
                    console.info('Bank table just created, creating some rows');
                    var insert = 'INSERT INTO bank (name) VALUES (?)'
                    db.run(insert, ["SANTANDER"], err => { err && console.log('bank', err.message) })
                    db.run(insert, ["ESTADO"], err => { err && console.log('bank', err.message) })
                    db.run(insert, ["ITAU"], err => { err && console.log('bank', err.message) })
                    db.run(insert, ["BCI"], err => { err && console.log('bank', err.message) })
                    db.run(insert, ["SCOTIABANK"], err => { err && console.log('bank', err.message) })
                    db.run(insert, ["BANCO DE CHILE"], err => { err && console.log('bank', err.message) })
                }
            });
        // EMPLOYEE TABLE
        db.run(`CREATE TABLE employee (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rut TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL,
                age TEXT NULL
                )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.info('Employee Oops!', err.message);
                } else {
                    // Table just created
                    console.info('Employee table just created, creating some rows');
                    var insert = 'INSERT INTO employee (rut, name, age) VALUES (?,?,?)'
                    db.run(insert, ["11.111.111-1", "Pepe Tapia", "22"], err => { err && console.log('employee', err.message) })
                    db.run(insert, ["12.111.111-1", "Alan Brito", "34"], err => { err && console.log('employee', err.message) })
                    db.run(insert, ["13.111.111-1", "Keka Galindo", "43"], err => { err && console.log('employee', err.message) })
                    db.run(insert, ["14.111.111-1", "Aquiles Canto", "28"], err => { err && console.log('employee', err.message) })
                    db.run(insert, ["15.111.111-1", "Armando Casas", "39"], err => { err && console.log('employee', err.message) })
                    db.run(insert, ["16.111.111-1", "Elsa Pito", "25"], err => { err && console.log('employee', err.message) })
                    db.run(insert, ["17.111.111-1", "Debora Melo", "37"], err => { err && console.log('employee', err.message) })
                    db.run(insert, ["18.111.111-1", "Porel Jackson", "28"], err => { err && console.log('employee', err.message) })
                }
            });
        // REGISTER TABLE
        db.run(`CREATE TABLE register (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                time DATETIME NOT NULL
                )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.info('Register Oops!', err.message);
                } else {
                    // Table just created
                    console.info('Register table just created, creating some rows');
                    var insert = 'INSERT INTO register (type, time) VALUES (?,?)'
                    db.run(insert, ["Entrada", randomDate()], err => { err && console.log('register', err.message) })
                    db.run(insert, ["Salida", randomDate()], err => { err && console.log('register', err.message) })
                    db.run(insert, ["Entrada", randomDate()], err => { err && console.log('register', err.message) })
                    db.run(insert, ["Salida", randomDate()], err => { err && console.log('register', err.message) })
                    db.run(insert, ["Entrada", randomDate()], err => { err && console.log('register', err.message) })
                    db.run(insert, ["Entrada", randomDate()], err => { err && console.log('register', err.message) })
                    db.run(insert, ["Salida", randomDate()], err => { err && console.log('register', err.message) })
                    db.run(insert, ["Salida", randomDate()], err => { err && console.log('register', err.message) })
                    db.run(insert, ["Entrada", randomDate()], err => { err && console.log('register', err.message) })
                }
            });
        // VIGILANTE TABLE
        db.run(`CREATE TABLE vigilante (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                employee_id INTEGER NOT NULL,
                FOREIGN KEY (employee_id) REFERENCES employee(id)
                )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.info('Vigilante Oops!', err.message);
                } else {
                    // Table just created
                    console.info('Vigilante table just created, creating some rows');
                    var insert = 'INSERT INTO vigilante (employee_id) VALUES (?)'
                    db.run(insert, [1], err => { err && console.log('vigilante', err.message) })
                    db.run(insert, [2], err => { err && console.log('vigilante', err.message) })
                    db.run(insert, [3], err => { err && console.log('vigilante', err.message) })
                }
            });
        // VIGILANTE REPORT TABLE
        db.run(`CREATE TABLE report (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                description TEXT NULL,
                date DATETIME NOT NULL,
                vigilante_id INTEGER NOT NULL,
                FOREIGN KEY (vigilante_id) REFERENCES vigilante(id)
                )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.info('Report Oops!', err.message);
                } else {
                    // Table just created
                    console.info('Report table just created, creating some rows');
                    var insert = 'INSERT INTO report (description, date, vigilante_id) VALUES (?, ?, ?)'
                    db.run(insert, ["Todo normal hoy.", randomDate(), 1], err => { err && console.log('report', err.message) })
                    db.run(insert, ["Encontré ratones en el baño, asquito!.", randomDate(), 1], err => { err && console.log('report', err.message) })
                    db.run(insert, ["Vi un fantasma sentado en las cajas!!.", randomDate(), 1], err => { err && console.log('report', err.message) })
                    db.run(insert, ["Entraron a robar, pero los espanté con una película de Sebastián Badilla.", randomDate(), 2], err => { err && console.log('report', err.message) })
                    db.run(insert, ["Vino el Tue-Tue a pedirme sal...", randomDate(), 2], err => { err && console.log('report', err.message) })
                    db.run(insert, ["Todo normal el día de hoy. Estuvo aburrido.", randomDate(), 2], err => { err && console.log('report', err.message) })
                    db.run(insert, ["Me quedé encerrado en el baño, por fortuna pude caber en la escotilla de ventilación. Comprar más papel...", randomDate(), 2], err => { err && console.log('report', err.message) })
                    db.run(insert, ["Todo bien.", randomDate(), 2], err => { err && console.log('report', err.message) })
                    db.run(insert, ["Saquearon el lugar, pero solo se llevaron el aceite de la cocina.", randomDate(), 3], err => { err && console.log('report', err.message) })
                    db.run(insert, ["Hay cucarachas en la recepción, jugaban póker.", randomDate(), 3], err => { err && console.log('report', err.message) })
                    db.run(insert, ["Hice un carrete en la sucursal, pero dejamos todo limpiecito.", randomDate(), 3], err => { err && console.log('report', err.message) })
                }
            });
        // BRANCH OFFICE TABLE
        db.run(`CREATE TABLE branch_office (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                address TEXT NOT NULL,
                bank_id INTEGER NOT NULL,
                vigilante_id INTEGER NOT NULL,
                FOREIGN KEY (bank_id) REFERENCES bank(id),
                FOREIGN KEY (vigilante_id) REFERENCES vigilante(id)
                )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.info('Branch Oops!', err.message);
                } else {
                    // Table just created
                    console.info('Branch table just created, creating some rows');
                    var insert = 'INSERT INTO branch_office (address, bank_id, vigilante_id) VALUES (?, ?, ?)'
                    db.run(insert, ["Los Naranjos 0293", 1, 1], err => { err && console.log('branch', err.message) })
                    db.run(insert, ["Las Pepitas 111", 1, 1], err => { err && console.log('branch', err.message) })
                    db.run(insert, ["Las Beñogas 089", 1, 1], err => { err && console.log('branch', err.message) })
                    db.run(insert, ["Av. Alemania", 3, 2], err => { err && console.log('branch', err.message) })
                    db.run(insert, ["Av. Francia", 3, 1], err => { err && console.log('branch', err.message) })
                    db.run(insert, ["Av. España", 3, 2], err => { err && console.log('branch', err.message) })
                    db.run(insert, ["Av. Inglaterra", 3, 2], err => { err && console.log('branch', err.message) })
                    db.run(insert, ["Pasaje Don Pepe", 6, 3], err => { err && console.log('branch', err.message) })
                    db.run(insert, ["Pasaje Sra. Magaly", 6, 2], err => { err && console.log('branch', err.message) })
                    db.run(insert, ["Pasaje Don Lucho", 6, 3], err => { err && console.log('branch', err.message) })
                }
            });
        // EMPLOYMENT TABLE (RELATION BETWEEN EMPLOYEES AND BRANCH OFFICE)
        db.run(`CREATE TABLE employment (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                employment_date DATE NOT NULL,
                branch_id INTEGER NOT NULL,
                employee_id INTEGER NOT NULL,
                FOREIGN KEY (branch_id) REFERENCES branch_office(id),
                FOREIGN KEY (employee_id) REFERENCES employee(id)
                )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.info('Employment Oops!', err.message);
                } else {
                    // Table just created
                    console.info('Employment table just created, creating some rows');
                    var insert = 'INSERT INTO employment (employment_date, branch_id, employee_id) VALUES (?, ?, ?)'
                    db.run(insert, [randomDate(), 1, 1], err => { err && console.log('employment', err.message) })
                    db.run(insert, [randomDate(), 1, 8], err => { err && console.log('employment', err.message) })
                    db.run(insert, [randomDate(), 1, 7], err => { err && console.log('employment', err.message) })
                    db.run(insert, [randomDate(), 3, 2], err => { err && console.log('employment', err.message) })
                    db.run(insert, [randomDate(), 3, 1], err => { err && console.log('employment', err.message) })
                    db.run(insert, [randomDate(), 3, 6], err => { err && console.log('employment', err.message) })
                    db.run(insert, [randomDate(), 6, 2], err => { err && console.log('employment', err.message) })
                    db.run(insert, [randomDate(), 6, 3], err => { err && console.log('employment', err.message) })
                    db.run(insert, [randomDate(), 6, 5], err => { err && console.log('employment', err.message) })
                    db.run(insert, [randomDate(), 6, 4], err => { err && console.log('employment', err.message) })
                }
            });
        // USER REGISTRATION TABLE
        db.run(`CREATE TABLE registration (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                employee_id INTEGER NOT NULL,
                register_id INTEGER NOT NULL,
                FOREIGN KEY (employee_id) REFERENCES employee(id),
                FOREIGN KEY (register_id) REFERENCES register(id)
                )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.info('Registration Oops!', err.message);
                } else {
                    // Table just created
                    console.info('Registration table just created, creating some rows');
                    var insert = 'INSERT INTO registration (employee_id, register_id) VALUES (?, ?)'
                    db.run(insert, [1, 1], err => { err && console.log('registration', err.message) })
                    db.run(insert, [1, 2], err => { err && console.log('registration', err.message) })
                    db.run(insert, [2, 3], err => { err && console.log('registration', err.message) })
                    db.run(insert, [2, 4], err => { err && console.log('registration', err.message) })
                    db.run(insert, [3, 5], err => { err && console.log('registration', err.message) })
                    db.run(insert, [2, 6], err => { err && console.log('registration', err.message) })
                    db.run(insert, [3, 7], err => { err && console.log('registration', err.message) })
                    db.run(insert, [2, 8], err => { err && console.log('registration', err.message) })
                    db.run(insert, [1, 9], err => { err && console.log('registration', err.message) })
                }
            });
    }
});

module.exports = db