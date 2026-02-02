import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Apply auth middleware to all payroll routes
router.use(authMiddleware as any);

// GET /api/payroll/batches - List payroll batches
router.get('/batches', async (req: AuthRequest, res: Response) => {
    try {
        const status = req.query.status as string;
        const where: any = { companyId: req.companyId };
        if (status) where.status = status;

        const batches = await prisma.payrollBatch.findMany({
            where,
            include: {
                payments: {
                    include: { worker: true }
                }
            },
            orderBy: { createdDate: 'desc' }
        });

        res.json(batches);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch payroll batches' });
    }
});

// POST /api/payroll/batches - Create payroll batch
router.post('/batches', async (req: AuthRequest, res: Response) => {
    try {
        const { name, workerIds, amounts } = req.body;

        // Calculate total
        const totalAmount = amounts.reduce((sum: number, amt: number) => sum + amt, 0);

        const batch = await prisma.payrollBatch.create({
            data: {
                companyId: req.companyId!,
                name,
                workerCount: workerIds.length,
                totalAmount,
                status: 'draft'
            }
        });

        // Create payment records
        const payments = await Promise.all(
            workerIds.map((workerId: string, index: number) =>
                prisma.payrollPayment.create({
                    data: {
                        batchId: batch.id,
                        workerId,
                        amount: amounts[index],
                        currency: 'USDC',
                        status: 'pending',
                        chain: 'Ethereum'
                    }
                })
            )
        );

        res.status(201).json({ ...batch, payments });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create payroll batch' });
    }
});

// GET /api/payroll/batches/:id - Get batch details
router.get('/batches/:id', async (req: Request, res: Response) => {
    try {
        const batch = await prisma.payrollBatch.findUnique({
            where: { id: req.params.id },
            include: {
                payments: {
                    include: { worker: true }
                }
            }
        });

        if (!batch) {
            return res.status(404).json({ error: 'Batch not found' });
        }

        res.json(batch);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch batch' });
    }
});

// PUT /api/payroll/batches/:id - Update batch
router.put('/batches/:id', async (req: Request, res: Response) => {
    try {
        const batch = await prisma.payrollBatch.update({
            where: { id: req.params.id },
            data: req.body,
            include: {
                payments: {
                    include: { worker: true }
                }
            }
        });

        res.json(batch);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update batch' });
    }
});

// POST /api/payroll/batches/:id/approve - Approve batch
router.post('/batches/:id/approve', async (req: Request, res: Response) => {
    try {
        const batch = await prisma.payrollBatch.update({
            where: { id: req.params.id },
            data: { status: 'approved' }
        });

        res.json(batch);
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve batch' });
    }
});

// POST /api/payroll/batches/:id/execute - Execute batch
router.post('/batches/:id/execute', async (req: Request, res: Response) => {
    try {
        const batch = await prisma.payrollBatch.update({
            where: { id: req.params.id },
            data: {
                status: 'processing',
                scheduledDate: new Date()
            },
            include: {
                payments: {
                    include: { worker: true }
                }
            }
        });

        // Update payment statuses and generate tx hashes
        await Promise.all(
            batch.payments.map(payment =>
                prisma.payrollPayment.update({
                    where: { id: payment.id },
                    data: {
                        status: 'processing',
                        txHash: `0x${Math.random().toString(16).substr(2, 64)}`
                    }
                })
            )
        );

        // Simulate completion after a delay
        setTimeout(async () => {
            await prisma.payrollBatch.update({
                where: { id: req.params.id },
                data: {
                    status: 'completed',
                    completedDate: new Date()
                }
            });

            await Promise.all(
                batch.payments.map(payment =>
                    prisma.payrollPayment.update({
                        where: { id: payment.id },
                        data: { status: 'completed' }
                    })
                )
            );
        }, 3000);

        res.json(batch);
    } catch (error) {
        res.status(500).json({ error: 'Failed to execute batch' });
    }
});

// GET /api/payroll/workers - List workers
router.get('/workers', async (req: AuthRequest, res: Response) => {
    try {
        const search = req.query.search as string;
        const kycStatus = req.query.kycStatus as string;

        const where: any = { companyId: req.companyId };
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { email: { contains: search } },
                { country: { contains: search } }
            ];
        }
        if (kycStatus) where.kycStatus = kycStatus;

        const workers = await prisma.worker.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        res.json(workers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workers' });
    }
});

// POST /api/payroll/workers - Add worker
router.post('/workers', async (req: AuthRequest, res: Response) => {
    try {
        const { name, role, email, phone, country, wallet, bankAccount, kycStatus } = req.body;

        const worker = await prisma.worker.create({
            data: {
                companyId: req.companyId!,
                name,
                role,
                email,
                phone,
                country,
                wallet,
                bankAccount,
                kycStatus: kycStatus || 'pending',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
            }
        });

        res.status(201).json(worker);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add worker' });
    }
});

// PUT /api/payroll/workers/:id - Update worker
router.put('/workers/:id', async (req: Request, res: Response) => {
    try {
        const worker = await prisma.worker.update({
            where: { id: req.params.id },
            data: req.body
        });

        res.json(worker);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update worker' });
    }
});

// DELETE /api/payroll/workers/:id - Remove worker
router.delete('/workers/:id', async (req: Request, res: Response) => {
    try {
        await prisma.worker.delete({
            where: { id: req.params.id }
        });

        res.json({ message: 'Worker removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove worker' });
    }
});

export default router;
