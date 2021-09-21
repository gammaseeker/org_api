"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("pg"), Pool = _a.Pool, Client = _a.Client;
// Use pool bc pool can handle concurrent db ops better than client
var pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
pool.on("error", function (err, client) {
    console.error("Unexpected error", err);
    process.exit(-1);
});
// check if table exists
pool.query("CREATE TABLE IF NOT EXISTS Organization(\n  ID serial PRIMARY KEY,  \n  OrgName varchar(255) NOT NULL,\n  StartDate date NOT NULL,\n  NumEmployees int NOT NULL,\n  Public boolean NOT NULL\n)", function (err, res) {
    if (err) {
        throw err;
    }
});
exports.default = pool;
