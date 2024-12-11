import oracledb from 'oracledb';

// Update libDir to your Oracle Client library path
oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_23_6' });

async function testConnection() {
    try {
        const connection = await oracledb.getConnection({
            user: 'ADMIN',
            password: process.env.ORACLE_PASSWORD,
            connectString: 'constructiondb_high'
        });
        console.log('Connected to OracleDB');
        await connection.close();
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

testConnection();
