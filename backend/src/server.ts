import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import remittanceRoutes from './routes/remittance.routes';
import payrollRoutes from './routes/payroll.routes';
import treasuryRoutes from './routes/treasury.routes';
import escrowRoutes from './routes/escrow.routes';
import analyticsRoutes from './routes/analytics.routes';
import complianceRoutes from './routes/compliance.routes';
import agentsRoutes from './routes/agents.routes';
import settingsRoutes from './routes/settings.routes';

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/remittance', remittanceRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/treasury', treasuryRoutes);
app.use('/api/escrow', escrowRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/agents', agentsRoutes);
app.use('/api/settings', settingsRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found', message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

export default app;
