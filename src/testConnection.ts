import oracledb from 'oracledb';

oracledb.initOracleClient({ libDir: './wallet' });

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
