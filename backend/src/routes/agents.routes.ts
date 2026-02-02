import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Apply auth middleware
router.use(authMiddleware as any);

// GET /api/agents - List all agents
router.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const status = req.query.status as string;
        const search = req.query.search as string;

        const where: any = { companyId: req.companyId };
        if (status) where.status = status;
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { location: { contains: search } },
                { country: { contains: search } }
            ];
        }

        const agents = await prisma.agent.findMany({
            where,
            include: {
                transactions: {
                    take: 5,
                    orderBy: { createdAt: 'desc' }
                }
            },
            orderBy: { joinedDate: 'desc' }
        });

        res.json(agents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch agents' });
    }
});

// POST /api/agents - Register new agent
router.post('/', async (req: AuthRequest, res: Response) => {
    try {
        const { name, location, country, phone, email } = req.body;

        const agent = await prisma.agent.create({
            data: {
                companyId: req.companyId!,
                name,
                location,
                country,
                phone,
                email,
                status: 'pending',
                rating: 0,
                totalPayouts: 0,
                completedTransactions: 0,
                pendingPayouts: 0
            }
        });

        res.status(201).json(agent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to register agent' });
    }
});

// GET /api/agents/:id - Get agent details
router.get('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const agent = await prisma.agent.findUnique({
            where: { id: req.params.id },
            include: {
                transactions: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!agent) {
            return res.status(404).json({ error: 'Agent not found' });
        }

        res.json(agent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch agent' });
    }
});

// PUT /api/agents/:id - Update agent
router.put('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const agent = await prisma.agent.update({
            where: { id: req.params.id },
            data: req.body
        });

        res.json(agent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update agent' });
    }
});

// POST /api/agents/:id/activate - Activate agent
router.post('/:id/activate', async (req: AuthRequest, res: Response) => {
    try {
        const agent = await prisma.agent.update({
            where: { id: req.params.id },
            data: { status: 'active' }
        });

        res.json(agent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to activate agent' });
    }
});

// POST /api/agents/:id/deactivate - Deactivate agent
router.post('/:id/deactivate', async (req: AuthRequest, res: Response) => {
    try {
        const agent = await prisma.agent.update({
            where: { id: req.params.id },
            data: { status: 'inactive' }
        });

        res.json(agent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to deactivate agent' });
    }
});

// GET /api/agents/:id/transactions - Agent transactions
router.get('/:id/transactions', async (req: AuthRequest, res: Response) => {
    try {
        const transactions = await prisma.agentTransaction.findMany({
            where: { agentId: req.params.id },
            orderBy: { createdAt: 'desc' }
        });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch agent transactions' });
    }
});

export default router;
