import { Router, Request, Response } from 'express';

const router = Router();

// Dummy data for estimates
const estimates = [
    { projectName: "Project 1", estimatedCost: 1000, deadline: "2024-12-31" },
    { projectName: "Project 2", estimatedCost: 2000, deadline: "2024-11-30" }
];

// GET route to retrieve estimates
router.get('/', (req: Request, res: Response) => {
    res.json(estimates); // Respond with the estimates array
});

// POST route to create a new estimate
router.post('/', (req: Request, res: Response) => {
    const { projectName, estimatedCost, deadline } = req.body;

    if (!projectName || !estimatedCost || !deadline) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Add the new estimate to the dummy data (in real-world, you would save to a database)
    const newEstimate = { projectName, estimatedCost, deadline };
    estimates.push(newEstimate);

    res.status(201).json({ message: "Estimate created successfully", estimate: newEstimate });
});

export default router;
