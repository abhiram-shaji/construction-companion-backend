import { Router, Request, Response } from 'express';
import { getConnection, closeConnection } from '../db';

const router = Router();

// GET route to retrieve tasks
router.get('/', async (req: Request, res: Response) => {
    let connection: any;

    try {
        connection = await getConnection();

        // Fetch tasks from the database, including project information
        const result = await connection.execute(
            `SELECT t.id, t.task_name AS "taskName", t.assigned_to AS "assignedTo", 
                    TO_CHAR(t.due_date, 'YYYY-MM-DD') AS "dueDate", t.status, 
                    e.project_name AS "projectName"
             FROM tasks t
             JOIN estimates e ON t.project_id = e.id`
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    } finally {
        await closeConnection(connection);
    }
});

// POST route to create a new task
router.post('/', async (req: Request, res: Response) => {
    const { taskName, assignedTo, dueDate, status, projectId } = req.body;

    // Validate input
    if (!taskName || !assignedTo || !dueDate || !status || !projectId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    let connection: any;

    try {
        connection = await getConnection();

        // Insert a new task into the database
        const result = await connection.execute(
            `INSERT INTO tasks (task_name, assigned_to, due_date, status, project_id)
             VALUES (:taskName, :assignedTo, TO_DATE(:dueDate, 'YYYY-MM-DD'), :status, :projectId)`,
            { taskName, assignedTo, dueDate, status, projectId },
            { autoCommit: true }
        );

        res.status(201).json({
            message: 'Task created successfully',
            task: {
                id: result.lastRowid, // Optionally, include the generated ID if available
                taskName,
                assignedTo,
                dueDate,
                status,
                projectId
            }
        });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Failed to create task' });
    } finally {
        await closeConnection(connection);
    }
});


// DELETE route to remove a task
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    let connection: any;

    try {
        connection = await getConnection();

        // Delete the task from the database
        const result = await connection.execute(
            `DELETE FROM tasks WHERE id = :id`,
            { id },
            { autoCommit: true }
        );

        if (result.rowsAffected === 0) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            res.json({ message: 'Task deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Failed to delete task' });
    } finally {
        await closeConnection(connection);
    }
});

export default router;
