import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
  // Parse the DATABASE_URL to extract components
  const dbUrl = new URL(process.env.DATABASE_URL);

  const dbConfig = {
    host: dbUrl.hostname,
    port: dbUrl.port,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.slice(1), // remove the leading '/'
    // This is the crucial part for secure production connections
    ssl: {
      rejectUnauthorized: true,
    },
  };

  const connection = await mysql.createConnection(dbConfig);

  try {
    const [results] = await connection.execute(query, values);
    connection.end();
    return results;
  } catch (error) {
    // Log the detailed error for debugging
    console.error("Database Query Error:", error.message);
    throw Error(error.message);
  }
}
