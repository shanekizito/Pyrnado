import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Apply auth middleware to all remittance routes
router.use(authMiddleware as any);

// GET /api/remittance - List all remittances
router.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const status = req.query.status as string;
        const search = req.query.search as string;

        const where: any = { companyId: req.companyId };
        if (status) where.status = status;
        if (search) {
            where.OR = [
                { sender: { contains: search } },
                { recipientCountry: { contains: search } }
            ];
        }

        const remittances = await prisma.remittance.findMany({
            where,
            include: { recipient: true },
            orderBy: { createdDate: 'desc' }
        });

        res.json(remittances);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch remittances' });
    }
});

// POST /api/remittance - Create new remittance
router.post('/', async (req: AuthRequest, res: Response) => {
    try {
        const {
            sender,
            recipientId,
            recipientCountry,
            amount,
            currency = 'USDC',
            localAmount,
            localCurrency,
            fxRate,
            fee,
            deliveryMethod,
            note
        } = req.body;

        const remittance = await prisma.remittance.create({
            data: {
                companyId: req.companyId!,
                sender,
                recipientId,
                recipientCountry,
                amount,
                currency,
                localAmount,
                localCurrency,
                fxRate,
                fee,
                deliveryMethod,
                note,
                status: 'pending',
                txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
                chain: 'Ethereum'
            },
            include: { recipient: true }
        });

        // Create transaction record
        await prisma.transaction.create({
            data: {
                companyId: req.companyId!,
                type: 'remittance',
                description: `Remittance to ${(remittance as any).recipient.name}`,
                amount,
                currency,
                isIncoming: false,
                status: 'pending',
                fees: fee,
                chain: 'Ethereum',
                txHash: remittance.txHash
            }
        });

        res.status(201).json(remittance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create remittance' });
    }
});

// GET /api/remittance/:id - Get remittance details
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const remittance = await prisma.remittance.findUnique({
            where: { id: req.params.id },
            include: { recipient: true }
        });

        if (!remittance) {
            return res.status(404).json({ error: 'Remittance not found' });
        }

        res.json(remittance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch remittance' });
    }
});

// PUT /api/remittance/:id - Update remittance
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const remittance = await prisma.remittance.update({
            where: { id: req.params.id },
            data: req.body,
            include: { recipient: true }
        });

        res.json(remittance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update remittance' });
    }
});

// POST /api/remittance/:id/cancel - Cancel remittance
router.post('/:id/cancel', async (req: Request, res: Response) => {
    try {
        const remittance = await prisma.remittance.update({
            where: { id: req.params.id },
            data: { status: 'failed' },
            include: { recipient: true }
        });

        res.json(remittance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to cancel remittance' });
    }
});

// GET /api/remittance/recipients/list - List recipients
router.get('/recipients/list', async (req: AuthRequest, res: Response) => {
    try {
        const recipients = await prisma.recipient.findMany({
            where: { companyId: req.companyId },
            orderBy: { createdAt: 'desc' }
        });

        res.json(recipients);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipients' });
    }
});

// POST /api/remittance/recipients/add - Add recipient
router.post('/recipients/add', async (req: AuthRequest, res: Response) => {
    try {
        const { name, email, phone, country, walletAddress, bankAccount, mobileNumber } = req.body;

        const recipient = await prisma.recipient.create({
            data: {
                companyId: req.companyId!,
                name,
                email,
                phone,
                country,
                walletAddress,
                bankAccount,
                mobileNumber
            }
        });

        res.status(201).json(recipient);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add recipient' });
    }
});

export default router;
