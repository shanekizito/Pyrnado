import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// --- PUBLIC ROUTES (No Auth Required) ---

// GET /api/escrow/public/:id - Get public contract details
router.get('/public/:id', async (req: Request, res: Response) => {
    try {
        // Increment views
        const contract = await prisma.contract.update({
            where: { id: req.params.id },
            data: { views: { increment: 1 } },
            include: {
                milestones: true,
                company: {
                    select: { name: true, country: true }
                }
            }
        });

        if (!contract || !contract.isPublic) {
            return res.status(404).json({ error: 'Contract not found or not public' });
        }

        res.json(contract);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch public contract' });
    }
});

// POST /api/escrow/public/:id/bid - Submit a bid
router.post('/public/:id/bid', async (req: Request, res: Response) => {
    try {
        const { contractorName, contractorEmail, proposal, amount } = req.body;

        const bid = await prisma.contractBid.create({
            data: {
                contractId: req.params.id,
                contractorName,
                contractorEmail,
                proposal,
                amount,
                status: 'pending'
            }
        });

        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit bid' });
    }
});

// --- PROTECTED ROUTES ---

// Apply auth middleware to all remaining routes
router.use(authMiddleware as any);

// GET /api/escrow/contracts - List contracts
router.get('/contracts', async (req: AuthRequest, res: Response) => {
    try {
        const status = req.query.status as string;
        const where: any = { companyId: req.companyId };
        if (status) where.status = status;

        const contracts = await prisma.contract.findMany({
            where,
            include: {
                milestones: true,
                _count: {
                    select: { bids: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(contracts);
    } catch (error) {
        console.error('Error fetching contracts:', error);
        res.status(500).json({ error: 'Failed to fetch contracts' });
    }
});

// GET /api/escrow/contracts/:id - Get single contract with bids
router.get('/contracts/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const contract = await prisma.contract.findFirst({
            where: {
                id: req.params.id,
                companyId: req.companyId
            },
            include: {
                milestones: true,
                bids: {
                    orderBy: { createdAt: 'desc' }
                },
                company: {
                    select: { name: true, country: true }
                }
            }
        });

        if (!contract) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        res.json(contract);
    } catch (error) {
        console.error('Error fetching contract:', error);
        res.status(500).json({ error: 'Failed to fetch contract' });
    }
});

// PUT /api/escrow/contracts/:id/bids/:bidId/accept - Accept a bid
router.put('/contracts/:id/bids/:bidId/accept', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        // Verify contract ownership
        const contract = await prisma.contract.findFirst({
            where: {
                id: req.params.id,
                companyId: req.companyId
            }
        });

        if (!contract) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        // Get the bid
        const bid = await prisma.contractBid.findFirst({
            where: {
                id: req.params.bidId,
                contractId: req.params.id
            }
        });

        if (!bid) {
            return res.status(404).json({ error: 'Bid not found' });
        }

        // Update bid status to accepted
        await prisma.contractBid.update({
            where: { id: req.params.bidId },
            data: { status: 'accepted' }
        });

        // Update contract with contractor info and set to active
        await prisma.contract.update({
            where: { id: req.params.id },
            data: {
                contractor: bid.contractorName,
                status: 'active',
                totalAmount: bid.amount,
                lockedAmount: bid.amount,
                isPublic: false // Close public bidding
            }
        });

        // Reject all other bids for this contract
        await prisma.contractBid.updateMany({
            where: {
                contractId: req.params.id,
                id: { not: req.params.bidId },
                status: 'pending'
            },
            data: { status: 'rejected' }
        });

        res.json({ message: 'Bid accepted successfully' });
    } catch (error) {
        console.error('Error accepting bid:', error);
        res.status(500).json({ error: 'Failed to accept bid' });
    }
});

// PUT /api/escrow/contracts/:id/bids/:bidId/reject - Reject a bid
router.put('/contracts/:id/bids/:bidId/reject', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        // Verify contract ownership
        const contract = await prisma.contract.findFirst({
            where: {
                id: req.params.id,
                companyId: req.companyId
            }
        });

        if (!contract) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        // Update bid status to rejected
        const bid = await prisma.contractBid.updateMany({
            where: {
                id: req.params.bidId,
                contractId: req.params.id
            },
            data: { status: 'rejected' }
        });

        if (bid.count === 0) {
            return res.status(404).json({ error: 'Bid not found' });
        }

        res.json({ message: 'Bid rejected successfully' });
    } catch (error) {
        console.error('Error rejecting bid:', error);
        res.status(500).json({ error: 'Failed to reject bid' });
    }
});

// PUT /api/escrow/contracts/:id/release - Release funds
router.put('/contracts/:id/release', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { amount } = req.body;

        // Verify contract ownership
        const contract = await prisma.contract.findFirst({
            where: {
                id: req.params.id,
                companyId: req.companyId
            }
        });

        if (!contract) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        if (contract.lockedAmount < amount) {
            return res.status(400).json({ error: 'Insufficient locked funds' });
        }

        // Update contract amounts
        await prisma.contract.update({
            where: { id: req.params.id },
            data: {
                lockedAmount: contract.lockedAmount - amount,
                releasedAmount: contract.releasedAmount + amount
            }
        });

        // Create transaction record
        await prisma.transaction.create({
            data: {
                companyId: req.companyId!,
                type: 'escrow',
                description: `Funds released for contract: ${contract.title}`,
                amount: amount,
                currency: 'USDC',
                isIncoming: false,
                status: 'settled',
                chain: contract.chain
            }
        });

        res.json({ message: 'Funds released successfully' });
    } catch (error) {
        console.error('Error releasing funds:', error);
        res.status(500).json({ error: 'Failed to release funds' });
    }
});

// POST /api/escrow/contracts - Create contract
router.post('/contracts', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const {
            title,
            description,
            client,
            contractor,
            totalAmount,
            startDate,
            endDate,
            milestones,
            isPublic
        } = req.body;

        const contract = await prisma.contract.create({
            data: {
                companyId: req.companyId!,
                title,
                description,
                client,
                contractor,
                totalAmount,
                lockedAmount: totalAmount,
                releasedAmount: 0,
                status: 'draft',
                isPublic: isPublic || false,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                chain: 'Ethereum',
                contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
                milestones: {
                    create: milestones.map((m: any) => ({
                        title: m.title,
                        description: m.description,
                        amount: m.amount,
                        status: 'pending',
                        dueDate: new Date(m.dueDate)
                    }))
                }
            },
            include: {
                milestones: true
            }
        });

        res.status(201).json(contract);
    } catch (error) {
        console.error('Error creating contract:', error);
        res.status(500).json({ error: 'Failed to create contract' });
    }
});

// GET /api/escrow/contracts/:id - Get contract details
router.get('/contracts/:id', async (req: Request, res: Response) => {
    try {
        const contract = await prisma.contract.findUnique({
            where: { id: req.params.id },
            include: {
                milestones: true
            }
        });

        if (!contract) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        res.json(contract);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contract' });
    }
});

// PUT /api/escrow/contracts/:id - Update contract
router.put('/contracts/:id', async (req: Request, res: Response) => {
    try {
        const contract = await prisma.contract.update({
            where: { id: req.params.id },
            data: req.body,
            include: {
                milestones: true
            }
        });

        res.json(contract);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update contract' });
    }
});

// POST /api/escrow/contracts/:id/milestones - Add milestone
router.post('/contracts/:id/milestones', async (req: Request, res: Response) => {
    try {
        const { title, description, amount, dueDate } = req.body;

        const milestone = await prisma.milestone.create({
            data: {
                contractId: req.params.id,
                title,
                description,
                amount,
                status: 'pending',
                dueDate: new Date(dueDate)
            }
        });

        res.status(201).json(milestone);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add milestone' });
    }
});

// PUT /api/escrow/contracts/:contractId/milestones/:milestoneId - Update milestone
router.put('/contracts/:contractId/milestones/:milestoneId', async (req: Request, res: Response) => {
    try {
        const milestone = await prisma.milestone.update({
            where: { id: req.params.milestoneId },
            data: req.body
        });

        res.json(milestone);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update milestone' });
    }
});

// POST /api/escrow/contracts/:contractId/release - Release funds
router.post('/contracts/:contractId/release', async (req: AuthRequest, res: Response) => {
    try {
        const { milestoneId, amount } = req.body;

        // Update milestone status
        await prisma.milestone.update({
            where: { id: milestoneId },
            data: {
                status: 'released',
                completedDate: new Date()
            }
        });

        // Update contract amounts
        const contract = await prisma.contract.update({
            where: { id: req.params.contractId },
            data: {
                lockedAmount: { decrement: amount },
                releasedAmount: { increment: amount }
            },
            include: {
                milestones: true
            }
        });

        // Create transaction record
        await prisma.transaction.create({
            data: {
                companyId: req.companyId!,
                type: 'escrow',
                description: `Escrow release: ${contract.title}`,
                amount,
                currency: 'USDC',
                isIncoming: false,
                status: 'settled',
                chain: 'Ethereum',
                txHash: `0x${Math.random().toString(16).substr(2, 64)}`
            }
        });

        res.json(contract);
    } catch (error) {
        res.status(500).json({ error: 'Failed to release funds' });
    }
});

// POST /api/escrow/contracts/:id/dispute - Raise dispute
router.post('/contracts/:id/dispute', async (req: Request, res: Response) => {
    try {
        const { reason } = req.body;

        const contract = await prisma.contract.update({
            where: { id: req.params.id },
            data: { status: 'disputed' },
            include: {
                milestones: true
            }
        });

        res.json(contract);
    } catch (error) {
        res.status(500).json({ error: 'Failed to raise dispute' });
    }
});

export default router;
