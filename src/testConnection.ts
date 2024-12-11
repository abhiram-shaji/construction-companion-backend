const oracledb = require('oracledb');

// Initialize the Oracle Client in Thick mode
oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_23_6' });

async function testConnection() {
  let connection;
  
  try {
    // Using the "constructiondb_high" connect string from your tnsnames.ora
    connection = await oracledb.getConnection({
      user: "ADMIN", // Make sure this is correct
      password: "Construction123456", // Ensure this is the correct password
      connectString: "constructiondb_high"
    });

    console.log("Connection was successful!");

    // Optional: Run a test query
    const result = await connection.execute("SELECT 'Hello from Oracle!' AS message FROM dual");
    console.log(result.rows[0][0]);

  } catch (err) {
    console.error("Error connecting to the database:", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

testConnection();
