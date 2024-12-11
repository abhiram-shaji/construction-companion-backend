import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    user: 'ADMIN', // Replace with your Oracle DB username
    password: process.env.ORACLE_PASSWORD, // Use .env for the password
    connectString: 'constructiondb_high', // Use the chosen connect string from tnsnames.ora
    walletLocation: './wallet', // Path to your extracted wallet directory
};

oracledb.initOracleClient({ configDir: dbConfig.walletLocation }); // Initialize Oracle Client with wallet

export async function getConnection() {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        return connection;
    } catch (error) {
        console.error('Failed to connect to OracleDB:', error);
        throw error;
    }
}
