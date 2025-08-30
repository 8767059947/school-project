import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
  // Configuration object that uses the connection string directly
  // and enforces SSL. This is the most reliable method.
  const dbConfig = {
    uri: process.env.DATABASE_URL,
    ssl: {
      // This is required for secure connections on platforms like Vercel
      rejectUnauthorized: true,
    },
  };

  let connection;
  try {
    // Establish the connection using the config object
    connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    // Log the actual error to Vercel for debugging
    console.error("DATABASE_ERROR:", error);
    throw new Error(error.message);
  } finally {
    // Make sure to close the connection in any case
    if (connection) {
      await connection.end();
    }
  }
}
