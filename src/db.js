const mysql = require('mysql2/promise');
const { Connector } = require('@google-cloud/cloud-sql-connector');

async function db() {
  console.log('INIT DB call');
  const connector = new Connector();

  const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME, // Replace with your instance connection name
    ipType: 'PUBLIC',
  });


  console.log("USER --------> ", process.env.DB_USER);

  const pool = await mysql.createPool({
    ...clientOpts,
    user: process.env.DB_USER, // Replace with your database user
    password: process.env.DB_PASSWORD, // Replace with your database password
    database: process.env.DB_NAME, // Replace with your database name
  });

  let conn;
  try {
    conn = await pool.getConnection();
    const [result] = await conn.query(`SELECT NOW();`);
    console.table(result); // prints returned time value from server
  } catch (err) {
    console.error('Error connecting to or querying the database:', err);
  } finally {
    if (conn) {
      conn.release(); // Release the connection back to the pool
    }
    await pool.end(); // Close the pool
    connector.close(); // Close the connector
  }
}

module.exports = db;