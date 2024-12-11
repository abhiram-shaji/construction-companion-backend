import { getConnection, closeConnection } from '../db';

async function testDB() {
    let connection: any;
    try {
        connection = await getConnection();
        const result = await connection.execute("SELECT 'Testing Oracle DB Connection' AS message FROM dual");
        console.log('Result:', result.rows);
    } catch (error) {
        console.error('Test connection failed:', error);
    } finally {
        await closeConnection(connection);
    }
}

testDB();
