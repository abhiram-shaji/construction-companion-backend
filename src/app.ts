import express, { Application } from 'express';
import cors from 'cors';
import estimatesRoutes from './routes/estimates';
import budgetsRoutes from './routes/budgets';
import tasksRoutes from './routes/tasks';

const app: Application = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/api/estimates', estimatesRoutes);
app.use('/api/budgets', budgetsRoutes);
app.use('/api/tasks', tasksRoutes);

// Handle 404 Errors for unknown routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
