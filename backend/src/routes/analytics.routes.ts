import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET /api/analytics/overview - Analytics overview
router.get('/overview', async (req: Request, res: Response) => {
    try {
        const [
            totalTransactions,
            totalVolume,
            activeUsers,
            avgTransactionValue
        ] = await Promise.all([
            prisma.transaction.count(),
            prisma.transaction.aggregate({ _sum: { amount: true } }),
            prisma.worker.count({ where: { kycStatus: 'verified' } }),
            prisma.transaction.aggregate({ _avg: { amount: true } })
        ]);

        res.json({
            totalTransactions,
            totalVolume: totalVolume._sum.amount || 0,
            activeUsers,
            avgTransactionValue: avgTransactionValue._avg.amount || 0
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics overview' });
    }
});

// GET /api/analytics/transactions - Transaction analytics
router.get('/transactions', async (req: Request, res: Response) => {
    try {
        const period = req.query.period as string || '30d';

        // Mock data for transaction volume over time
        const data = Array.from({ length: 12 }, (_, i) => ({
            month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
            volume: Math.floor(1000 + Math.random() * 1000),
            count: Math.floor(100 + Math.random() * 200)
        }));

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transaction analytics' });
    }
});

// GET /api/analytics/revenue - Revenue analytics
router.get('/revenue', async (req: Request, res: Response) => {
    try {
        const fees = await prisma.transaction.aggregate({
            _sum: { fees: true },
            where: {
                fees: { not: null }
            }
        });

        const monthlyRevenue = Array.from({ length: 12 }, (_, i) => ({
            month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
            revenue: Math.floor(5000 + Math.random() * 5000)
        }));

        res.json({
            totalFees: fees._sum.fees || 0,
            monthlyRevenue
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch revenue analytics' });
    }
});

// GET /api/analytics/geography - Geographic distribution
router.get('/geography', async (req: Request, res: Response) => {
    try {
        const remittancesByCountry = await prisma.remittance.groupBy({
            by: ['recipientCountry'],
            _count: true,
            _sum: { amount: true }
        });

        const data = remittancesByCountry.map(item => ({
            country: item.recipientCountry,
            count: item._count,
            volume: item._sum.amount || 0
        }));

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch geographic analytics' });
    }
});

// GET /api/analytics/export - Export analytics data
router.get('/export', async (req: Request, res: Response) => {
    try {
        const format = req.query.format as string || 'json';
        const type = req.query.type as string || 'transactions';

        let data: any[] = [];

        switch (type) {
            case 'transactions':
                data = await prisma.transaction.findMany({
                    orderBy: { timestamp: 'desc' }
                });
                break;
            case 'remittances':
                data = await prisma.remittance.findMany({
                    include: { recipient: true }
                });
                break;
            case 'payroll':
                data = await prisma.payrollBatch.findMany({
                    include: { payments: true }
                });
                break;
            default:
                data = await prisma.transaction.findMany();
        }

        if (format === 'csv') {
            // Simple CSV conversion
            const headers = Object.keys(data[0] || {}).join(',');
            const rows = data.map(row => Object.values(row).join(','));
            const csv = [headers, ...rows].join('\n');

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename=${type}-export.csv`);
            res.send(csv);
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to export analytics data' });
    }
});

export default router;
