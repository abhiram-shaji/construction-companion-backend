import { Router } from 'express';

const router = Router();

// GET route
router.get('/', (req, res) => {
    res.send('List of budgets');
});

// PUT route
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { budgetLimit, currentSpend } = req.body;
    res.send(`Budget ${id} updated with limit ${budgetLimit} and current spend ${currentSpend}`);
});

export default router;
