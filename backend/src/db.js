const Database = require("better-sqlite3");
const db = new Database("../base.db");

module.exports = db;
