const express = require('express');
const router = express.Router();
const prisma = require('../config/prisma');

router.get('/', async (req, res) => {
  try {
    // Query DB and get PostgreSQL version info
    const versionResult = await prisma.$queryRaw`SELECT version()`;
    const fullVersion = versionResult[0]?.version || '';
    const match = fullVersion.match(/PostgreSQL ([\d\.]+)/i);
    const pgVersion = match ? match[1] : (fullVersion || 'Unknown');

    res.status(200).json({
      success: true,
      database: 'CONNECTED',
      data: {
        status: 'UP',
        database: 'CONNECTED',
        postgresVersion: pgVersion,
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Health check failed: ' + error.message,
      data: {
        status: 'DOWN',
        database: 'DISCONNECTED',
        postgresVersion: null,
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
      }
    });
  }
});

module.exports = router;
