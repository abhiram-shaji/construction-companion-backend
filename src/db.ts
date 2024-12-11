import dotenv from 'dotenv';

// Import oracledb as `any` to bypass TypeScript errors
const oracledb: any = require('oracledb');

dotenv.config();

// Initialize the Oracle Client
try {
    oracledb.initOracleClient({ libDir: './src/instantclient_23_6' }); // Replace with your actual Instant Client path
    console.log('Oracle Client initialized successfully!');
} catch (err) {
    console.error('Failed to initialize Oracle Client:', err);
    process.exit(1); // Exit the application if the Oracle Client fails to initialize
}

// Load database configuration from environment variables
const dbConfig = {
    user: process.env.ORACLE_USER, // Oracle DB username
    password: process.env.ORACLE_PASSWORD, // Oracle DB password
    connectString: process.env.ORACLE_CONNECT_STRING, // Connect string from tnsnames.ora
};

// Function to establish a connection
export async function getConnection() {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        console.log('Connected to OracleDB successfully!');
        return connection;
    } catch (err) {
        console.error('Error connecting to OracleDB:', err);
        throw err; // Re-throw the error for further handling
    }
}

// Function to close a connection (optional utility)
export async function closeConnection(connection: any) {
    try {
        if (connection) {
            await connection.close();
            console.log('Connection closed successfully!');
        }
    } catch (err) {
        console.error('Error closing OracleDB connection:', err);
    }
}
