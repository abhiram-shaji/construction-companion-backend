import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

const walletLocation = 'C:\\Wallet_constructiondb';  // Use forward slashes or ensure escapes

try {
  oracledb.initOracleClient({ configDir: walletLocation });
  console.log('Oracle Client initialized successfully!');
} catch (err) {
  console.error('Failed to initialize Oracle Client:', err);
  process.exit(1);
}

const dbConfig = {
    user: 'ADMIN',
    password: process.env.ORACLE_PASSWORD,
    connectString: 'constructiondb_medium' // Use the exact alias from tnsnames.ora
  };

export async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log('Connected to OracleDB successfully!');
    return connection;
  } catch (error) {
    console.error('Failed to connect to OracleDB:', error);
    throw error;
  }
}
