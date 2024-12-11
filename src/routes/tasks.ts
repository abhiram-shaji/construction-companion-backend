import { Router } from 'express';

const router = Router();

// GET route
router.get('/', (req, res) => {
    // Replace with logic to fetch tasks (e.g., from a database)
    res.send('List of tasks');
});

// POST route
router.post('/', (req, res) => {
    const { taskName, assignedTo, dueDate } = req.body;
    res.send(`Task ${taskName} assigned to ${assignedTo} with due date ${dueDate}`);
});

// DELETE route
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Task ${id} deleted`);
});

export default router;
