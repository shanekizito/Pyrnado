import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET /api/compliance/items - List compliance items
router.get('/items', async (req: Request, res: Response) => {
    try {
        const type = req.query.type as string;
        const status = req.query.status as string;
        const riskLevel = req.query.riskLevel as string;

        const where: any = {};
        if (type) where.type = type;
        if (status) where.status = status;
        if (riskLevel) where.riskLevel = riskLevel;

        const items = await prisma.complianceItem.findMany({
            where,
            orderBy: { date: 'desc' }
        });

        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch compliance items' });
    }
});

// POST /api/compliance/kyc - Submit KYC
router.post('/kyc', async (req: Request, res: Response) => {
    try {
        const { entity, details } = req.body;

        const kycItem = await prisma.complianceItem.create({
            data: {
                type: 'kyc',
                entity,
                status: 'pending',
                riskLevel: 'low',
                details
            }
        });

        // Simulate KYC verification
        setTimeout(async () => {
            await prisma.complianceItem.update({
                where: { id: kycItem.id },
                data: { status: 'approved' }
            });
        }, 5000);

        res.status(201).json(kycItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit KYC' });
    }
});

// GET /api/compliance/kyc/:id - Get KYC status
router.get('/kyc/:id', async (req: Request, res: Response) => {
    try {
        const item = await prisma.complianceItem.findUnique({
            where: { id: req.params.id }
        });

        if (!item) {
            return res.status(404).json({ error: 'KYC item not found' });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch KYC status' });
    }
});

// POST /api/compliance/aml - Run AML check
router.post('/aml', async (req: Request, res: Response) => {
    try {
        const { entity, details } = req.body;

        const amlItem = await prisma.complianceItem.create({
            data: {
                type: 'aml',
                entity,
                status: 'pending',
                riskLevel: 'medium',
                details
            }
        });

        // Simulate AML check
        setTimeout(async () => {
            const riskLevel = Math.random() > 0.8 ? 'high' : 'low';
            const status = riskLevel === 'high' ? 'flagged' : 'approved';

            await prisma.complianceItem.update({
                where: { id: amlItem.id },
                data: { status, riskLevel }
            });
        }, 3000);

        res.status(201).json(amlItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to run AML check' });
    }
});

// GET /api/compliance/reports - Compliance reports
router.get('/reports', async (req: Request, res: Response) => {
    try {
        const startDate = req.query.startDate as string;
        const endDate = req.query.endDate as string;

        const where: any = {};
        if (startDate && endDate) {
            where.date = {
                gte: new Date(startDate),
                lte: new Date(endDate)
            };
        }

        const items = await prisma.complianceItem.findMany({
            where,
            orderBy: { date: 'desc' }
        });

        const summary = {
            total: items.length,
            approved: items.filter(i => i.status === 'approved').length,
            pending: items.filter(i => i.status === 'pending').length,
            flagged: items.filter(i => i.status === 'flagged').length,
            rejected: items.filter(i => i.status === 'rejected').length,
            byType: {
                kyc: items.filter(i => i.type === 'kyc').length,
                aml: items.filter(i => i.type === 'aml').length,
                sanctions: items.filter(i => i.type === 'sanctions').length,
                transaction: items.filter(i => i.type === 'transaction').length
            },
            byRiskLevel: {
                low: items.filter(i => i.riskLevel === 'low').length,
                medium: items.filter(i => i.riskLevel === 'medium').length,
                high: items.filter(i => i.riskLevel === 'high').length
            }
        };

        res.json({ summary, items });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate compliance reports' });
    }
});

export default router;
