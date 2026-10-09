const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { initDb } = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Initialize MySQL database connection (with resilient in-memory fallback)
  await initDb();

  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🎓 StudySphere REST API Backend running on port ${PORT}`);
    console.log(`📡 URL: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
};

startServer();
