import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import crypto from 'crypto';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Apply auth middleware to all settings routes
router.use(authMiddleware as any);

// GET /api/settings/profile - Get company profile
router.get('/profile', async (req: AuthRequest, res: Response) => {
    try {
        const company = await prisma.company.findUnique({
            where: { id: req.companyId }
        });

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        res.json(company);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// PUT /api/settings/profile - Update profile
router.put('/profile', async (req: AuthRequest, res: Response) => {
    try {
        const { name, email, phone, country, address, isTestMode } = req.body;

        const company = await prisma.company.update({
            where: { id: req.companyId },
            data: {
                name,
                email,
                phone,
                country,
                address,
                isTestMode: isTestMode !== undefined ? isTestMode : undefined
            }
        });

        res.json(company);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// GET /api/settings/api-keys - List API keys
router.get('/api-keys', async (req: AuthRequest, res: Response) => {
    try {
        const apiKeys = await prisma.apiKey.findMany({
            where: { companyId: req.companyId },
            orderBy: { createdAt: 'desc' }
        });

        res.json(apiKeys);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch API keys' });
    }
});

// POST /api/settings/api-keys - Generate API key
router.post('/api-keys', async (req: AuthRequest, res: Response) => {
    try {
        const { name } = req.body;
        const env = req.body.environment || 'live';

        // Generate random API key
        const prefix = env === 'live' ? 'kash_live' : 'kash_test';
        const randomKey = crypto.randomBytes(24).toString('hex');
        const key = `${prefix}_${randomKey}`;

        const apiKey = await prisma.apiKey.create({
            data: {
                companyId: req.companyId!,
                name,
                key
            }
        });

        res.status(201).json(apiKey);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate API key' });
    }
});

// DELETE /api/settings/api-keys/:id - Revoke API key
router.delete('/api-keys/:id', async (req: AuthRequest, res: Response) => {
    try {
        await prisma.apiKey.delete({
            where: {
                id: req.params.id,
                companyId: req.companyId // Ensure user owns the key
            }
        });

        res.json({ message: 'API key revoked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to revoke API key' });
    }
});

// GET /api/settings/webhooks - List webhooks
router.get('/webhooks', async (req: AuthRequest, res: Response) => {
    try {
        const webhooks = await prisma.webhook.findMany({
            where: { companyId: req.companyId },
            orderBy: { createdAt: 'desc' }
        });

        res.json(webhooks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch webhooks' });
    }
});

// POST /api/settings/webhooks - Create webhook
router.post('/webhooks', async (req: AuthRequest, res: Response) => {
    try {
        const { url, events } = req.body;

        // Generate webhook secret
        const secret = crypto.randomBytes(32).toString('hex');

        const webhook = await prisma.webhook.create({
            data: {
                companyId: req.companyId!,
                url,
                events: JSON.stringify(events),
                secret,
                active: true
            }
        });

        res.status(201).json(webhook);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create webhook' });
    }
});

// PUT /api/settings/webhooks/:id - Update webhook
router.put('/webhooks/:id', async (req: AuthRequest, res: Response) => {
    try {
        const { url, events, active } = req.body;

        const webhook = await prisma.webhook.update({
            where: {
                id: req.params.id,
                companyId: req.companyId
            },
            data: {
                url,
                events: events ? JSON.stringify(events) : undefined,
                active
            }
        });

        res.json(webhook);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update webhook' });
    }
});

// DELETE /api/settings/webhooks/:id - Delete webhook
router.delete('/webhooks/:id', async (req: AuthRequest, res: Response) => {
    try {
        await prisma.webhook.delete({
            where: {
                id: req.params.id,
                companyId: req.companyId
            }
        });

        res.json({ message: 'Webhook deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete webhook' });
    }
});

// GET /api/settings/metrics - Get usage metrics
router.get('/metrics', async (req: AuthRequest, res: Response) => {
    try {
        const metrics = await prisma.usageMetric.findMany({
            where: { companyId: req.companyId },
            orderBy: { timestamp: 'desc' },
            take: 100
        });

        res.json(metrics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch metrics' });
    }
});

export default router;
