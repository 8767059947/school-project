import mysql from 'mysql2/promise';

export async function query({ query, values = [] }) {
  // Connect to the database
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    // Execute the query with prepared statements to prevent SQL injection
    const [results] = await connection.execute(query, values);
    connection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
  }
}