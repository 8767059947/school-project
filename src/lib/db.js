import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
  // Configuration that uses the connection string directly
  // and disables certificate validation, which is needed for Aiven on Vercel.
  const dbConfig = {
    uri: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    console.error("DATABASE_ERROR:", error);
    throw new Error("Failed to execute database query.");
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
