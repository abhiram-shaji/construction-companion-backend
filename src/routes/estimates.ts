import { Router } from 'express';

const router = Router();

// GET route
router.get('/', (req, res) => {
    res.send('List of estimates');
});

// POST route
router.post('/', (req, res) => {
    const { projectName, estimatedCost, deadline } = req.body;
    res.send(`Estimate for ${projectName} created with cost ${estimatedCost} and deadline ${deadline}`);
});

export default router;
