import { Router } from 'express';

const router = Router();

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
