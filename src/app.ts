import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import estimatesRoutes from './routes/estimates';
import budgetsRoutes from './routes/budgets';
import tasksRoutes from './routes/tasks';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/estimates', estimatesRoutes);
app.use('/api/budgets', budgetsRoutes);
app.use('/api/tasks', tasksRoutes);

export default app;
