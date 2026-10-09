const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

let pool = null;
let isConnected = false;

const initDb = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'studysphere_db',
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL Database: studysphere_db');
    connection.release();
    isConnected = true;
    return pool;
  } catch (error) {
    console.warn('⚠️  MySQL Database connection failed or server not active:', error.message);
    console.log('ℹ️  StudySphere is operating with relational in-memory schema fallback (18 entities active).');
    isConnected = false;
    return null;
  }
};

const query = async (sql, params = []) => {
  if (isConnected && pool) {
    const [results] = await pool.execute(sql, params);
    return results;
  }
  return null;
};

module.exports = {
  initDb,
  query,
  getIsConnected: () => isConnected,
  getPool: () => pool
};
