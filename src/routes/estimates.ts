import { Router, Request, Response } from 'express';
import { getConnection, closeConnection } from '../db';

const router = Router();

// GET route to retrieve estimates
router.get('/', async (req: Request, res: Response) => {
    let connection: any;

    try {
        connection = await getConnection();

        // Fetch estimates from the database
        const result = await connection.execute(
            `SELECT project_name AS "projectName", estimated_cost AS "estimatedCost", deadline FROM estimates`
        );

        res.json(result.rows); // Return the database rows as the response
    } catch (error) {
        console.error('Error fetching estimates:', error);
        res.status(500).json({ message: 'Failed to fetch estimates' });
    } finally {
        await closeConnection(connection);
    }
});

// POST route to create a new estimate
router.post('/', async (req: Request, res: Response) => {
    const { projectName, estimatedCost, deadline } = req.body;

    if (!projectName || !estimatedCost || !deadline) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    let connection: any;

    try {
        connection = await getConnection();

        // Insert a new estimate into the database
        await connection.execute(
            `INSERT INTO estimates (project_name, estimated_cost, deadline) VALUES (:projectName, :estimatedCost, TO_DATE(:deadline, 'YYYY-MM-DD'))`,
            { projectName, estimatedCost, deadline }, // Bind variables
            { autoCommit: true } // Commit changes
        );

        res.status(201).json({ message: 'Estimate created successfully' });
    } catch (error) {
        console.error('Error creating estimate:', error);
        res.status(500).json({ message: 'Failed to create estimate' });
    } finally {
        await closeConnection(connection);
    }
});

// DELETE route to delete an estimate
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Missing estimate ID' });
    }

    let connection: any;

    try {
        connection = await getConnection();

        // Execute delete query
        const result = await connection.execute(
            `DELETE FROM estimates WHERE id = :id`,
            { id }, // Bind variables
            { autoCommit: true } // Commit changes
        );

        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: 'Estimate not found' });
        }

        res.json({ message: 'Estimate deleted successfully' });
    } catch (error) {
        console.error('Error deleting estimate:', error);
        res.status(500).json({ message: 'Failed to delete estimate' });
    } finally {
        await closeConnection(connection);
    }
});


export default router;
