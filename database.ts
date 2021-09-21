const { Pool, Client } = require("pg");

// Use pool bc pool can handle concurrent db ops better than client
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.on("error", (err: any, client: any) => {
  console.error("Unexpected error", err);
  process.exit(-1);
});

// check if table exists
pool.query(
  `CREATE TABLE IF NOT EXISTS Organization(
  ID serial PRIMARY KEY,  
  OrgName varchar(255) NOT NULL,
  StartDate date NOT NULL,
  NumEmployees int NOT NULL,
  Public boolean NOT NULL
)`,
  (err: any, res: any) => {
    if (err) {
      throw err;
    }
  }
);

export default pool;
