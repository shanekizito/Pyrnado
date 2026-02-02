import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET /api/treasury/assets - List all assets
router.get('/assets', async (req: Request, res: Response) => {
    try {
        const assets = await prisma.asset.findMany({
            orderBy: { usdValue: 'desc' }
        });

        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assets' });
    }
});

// GET /api/treasury/portfolio - Portfolio summary
router.get('/portfolio', async (req: Request, res: Response) => {
    try {
        const assets = await prisma.asset.findMany();
        const totalValue = assets.reduce((sum, asset) => sum + asset.usdValue, 0);

        // Mock historical data for chart
        const history = Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            value: totalValue * (0.95 + Math.random() * 0.1)
        }));

        res.json({
            totalValue,
            assets: assets.length,
            history
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
});

// POST /api/treasury/swap - Execute token swap
router.post('/swap', async (req: Request, res: Response) => {
    try {
        const { fromAsset, toAsset, fromAmount, toAmount, rate, fee } = req.body;

        const swap = await prisma.swap.create({
            data: {
                fromAsset,
                toAsset,
                fromAmount,
                toAmount,
                rate,
                fee,
                status: 'pending',
                txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
                chain: 'Ethereum'
            }
        });

        // Update asset balances
        await prisma.asset.update({
            where: { symbol: fromAsset },
            data: {
                balance: { decrement: fromAmount },
                usdValue: { decrement: fromAmount }
            }
        });

        await prisma.asset.update({
            where: { symbol: toAsset },
            data: {
                balance: { increment: toAmount },
                usdValue: { increment: toAmount }
            }
        });

        // Create transaction record
        await prisma.transaction.create({
            data: {
                type: 'swap',
                description: `Swap ${fromAmount} ${fromAsset} to ${toAmount} ${toAsset}`,
                amount: fromAmount,
                currency: fromAsset,
                isIncoming: false,
                status: 'settled',
                fees: fee,
                chain: 'Ethereum',
                txHash: swap.txHash
            }
        });

        // Simulate completion
        setTimeout(async () => {
            await prisma.swap.update({
                where: { id: swap.id },
                data: { status: 'completed' }
            });
        }, 2000);

        res.status(201).json(swap);
    } catch (error) {
        res.status(500).json({ error: 'Failed to execute swap' });
    }
});

// POST /api/treasury/deposit - Deposit funds
router.post('/deposit', async (req: Request, res: Response) => {
    try {
        const { asset, amount } = req.body;

        // Update asset balance
        await prisma.asset.update({
            where: { symbol: asset },
            data: {
                balance: { increment: amount },
                usdValue: { increment: amount }
            }
        });

        // Create transaction record
        const transaction = await prisma.transaction.create({
            data: {
                type: 'deposit',
                description: `Deposit ${amount} ${asset}`,
                amount,
                currency: asset,
                isIncoming: true,
                status: 'settled',
                chain: 'Ethereum',
                txHash: `0x${Math.random().toString(16).substr(2, 64)}`
            }
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to process deposit' });
    }
});

// POST /api/treasury/withdraw - Withdraw funds
router.post('/withdraw', async (req: Request, res: Response) => {
    try {
        const { asset, amount, address } = req.body;

        // Update asset balance
        await prisma.asset.update({
            where: { symbol: asset },
            data: {
                balance: { decrement: amount },
                usdValue: { decrement: amount }
            }
        });

        // Create transaction record
        const transaction = await prisma.transaction.create({
            data: {
                type: 'withdrawal',
                description: `Withdraw ${amount} ${asset} to ${address.substring(0, 10)}...`,
                amount,
                currency: asset,
                isIncoming: false,
                status: 'processing',
                chain: 'Ethereum',
                txHash: `0x${Math.random().toString(16).substr(2, 64)}`
            }
        });

        // Simulate completion
        setTimeout(async () => {
            await prisma.transaction.update({
                where: { id: transaction.id },
                data: { status: 'settled' }
            });
        }, 3000);

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to process withdrawal' });
    }
});

// GET /api/treasury/history - Transaction history
router.get('/history', async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 50;
        const type = req.query.type as string;

        const where: any = {};
        if (type) where.type = type;

        const transactions = await prisma.transaction.findMany({
            where,
            take: limit,
            orderBy: { timestamp: 'desc' }
        });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transaction history' });
    }
});

export default router;
