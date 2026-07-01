const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const schemaPath = path.resolve(__dirname, 'schema.sql');

const db = new Database(dbPath);

// Initialize schema
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

module.exports = db;
