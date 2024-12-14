import express, { Application } from 'express';
import cors from 'cors';
//import usersRoutes from './routes/users';
//import authRoutes from './routes/auth';
//import projectsRoutes from './routes/projects';
import tasksRoutes from './routes/tasks';
import budgetsRoutes from './routes/budgets';
import estimatesRoutes from './routes/estimates';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
//app.use('/api/users', usersRoutes);
//app.use('/api/auth', authRoutes);
//app.use('/api/projects', projectsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/budgets', budgetsRoutes);
app.use('/api/estimates', estimatesRoutes);

// Handle 404 Errors for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
