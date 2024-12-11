import { Router, Request, Response } from 'express';
import { getConnection, closeConnection } from '../../db';

const router = Router();

// GET route to retrieve budgets
router.get('/', async (req: Request, res: Response) => {
    let connection: any;

    try {
        connection = await getConnection();

        // Fetch budgets from the database
        const result = await connection.execute(
            `SELECT id, project_id AS "projectId", budget_limit AS "budgetLimit", current_spend AS "currentSpend"
             FROM budgets`
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching budgets:', error);
        res.status(500).json({ message: 'Failed to fetch budgets' });
    } finally {
        await closeConnection(connection);
    }
});

// PUT route to update a budget
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { budgetLimit, currentSpend } = req.body;

    if (!budgetLimit || !currentSpend) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    let connection: any;

    try {
        connection = await getConnection();

        // Update the budget in the database
        const result = await connection.execute(
            `UPDATE budgets
             SET budget_limit = :budgetLimit, current_spend = :currentSpend
             WHERE id = :id`,
            { budgetLimit, currentSpend, id },
            { autoCommit: true }
        );

        if (result.rowsAffected === 0) {
            res.status(404).json({ message: 'Budget not found' });
        } else {
            res.json({ message: 'Budget updated successfully' });
        }
    } catch (error) {
        console.error('Error updating budget:', error);
        res.status(500).json({ message: 'Failed to update budget' });
    } finally {
        await closeConnection(connection);
    }
});

export default router;
