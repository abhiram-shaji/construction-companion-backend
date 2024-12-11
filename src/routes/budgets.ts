import { Router, Request, Response } from 'express';
import { getConnection, closeConnection } from '../../db';

const router = Router();

// GET route to retrieve budgets
router.get('/', async (req: Request, res: Response) => {
    let connection: any;

    try {
        connection = await getConnection();

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

// POST route to create a new budget
router.post('/', async (req: Request, res: Response) => {
    const { projectId, budgetLimit, currentSpend } = req.body;

    // Validate input
    if (!projectId || !budgetLimit || !currentSpend) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    let connection: any;

    try {
        connection = await getConnection();

        const result = await connection.execute(
            `INSERT INTO budgets (project_id, budget_limit, current_spend)
             VALUES (:projectId, :budgetLimit, :currentSpend)`,
            { projectId, budgetLimit, currentSpend },
            { autoCommit: true }
        );

        res.status(201).json({
            message: 'Budget created successfully',
            budget: {
                projectId,
                budgetLimit,
                currentSpend,
            },
        });
    } catch (error) {
        console.error('Error creating budget:', error);
        res.status(500).json({ message: 'Failed to create budget' });
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
            const updatedBudget = await connection.execute(
                `SELECT id, project_id AS "projectId", budget_limit AS "budgetLimit", current_spend AS "currentSpend"
                 FROM budgets
                 WHERE id = :id`,
                { id }
            );

            res.json({
                message: 'Budget updated successfully',
                budget: updatedBudget.rows[0],
            });
        }
    } catch (error) {
        console.error('Error updating budget:', error);
        res.status(500).json({ message: 'Failed to update budget' });
    } finally {
        await closeConnection(connection);
    }
});

export default router;
