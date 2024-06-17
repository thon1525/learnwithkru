import express from 'express';
import { healthRoutes } from './routes';


//app
const app = express();

// Health Route [Not via API Gateway]
app.use('/health', healthRoutes);

export default app;
