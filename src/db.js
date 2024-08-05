const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('DB connected successfully');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1); // Exit the process if the connection fails
  }
}

connectToDatabase();

module.exports = client;
