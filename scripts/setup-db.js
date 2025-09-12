const mysql = require('mysql2/promise');
require('dotenv').config({ path: './.env.local' });

async function setupDatabase() {
  console.log("Connecting to the database...");
  
  // Use the connection string from your .env.local file
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  console.log("Connection successful!");

  try {
    // The SQL command to create the table
    // "IF NOT EXISTS" prevents an error if the table already exists
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        contact VARCHAR(255),
        image TEXT,
        email_id VARCHAR(255) UNIQUE
      );
    `;
    
    console.log("Running CREATE TABLE script...");
    await connection.execute(createTableQuery);
    console.log("✅ Table 'schools' is ready.");

     const createOtpsTableQuery = `
      CREATE TABLE IF NOT EXISTS otps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Checking/Creating 'otps' table...");
    await connection.execute(createOtpsTableQuery);
    console.log("✅ Table 'otps' is ready.");

    
  } catch (error) {
    console.error("❌ An error occurred:", error.message);
  } finally {
    // Always close the connection
    await connection.end();
    console.log("Database connection closed.");
  }
}

setupDatabase();