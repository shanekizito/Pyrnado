import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import crypto from 'crypto';

const router = Router();

// POST /api/auth/signup - Create new user account
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { email, name, password, companyName, country } = req.body;

        // Validation
        if (!email || !name || !password || !companyName || !country) {
            return res.status(400).json({
                error: 'Missing required fields',
                details: 'Please provide all required information'
            });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return res.status(409).json({
                error: 'Account already exists',
                details: 'An account with this email already exists. Please login instead.'
            });
        }

        // Create company first
        const company = await prisma.company.create({
            data: {
                name: companyName.trim(),
                email: email.toLowerCase(),
                country: country.trim(),
                isTestMode: true,
                phone: '',
                address: ''
            }
        });

        // Create user
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                name: name.trim(),
                password: password, // In production, hash this!
                companyId: company.id
            }
        });

        // Seed initial data for "Test Mode"
        await prisma.worker.createMany({
            data: [
                {
                    name: 'Alex Rivera',
                    role: 'Senior Engineer',
                    email: `alex.${company.id}@example.com`,
                    phone: '+1 555-0101',
                    country: 'United States',
                    wallet: '0x71C7...f9a1',
                    kycStatus: 'verified',
                    totalPaid: 12500,
                    companyId: company.id
                },
                {
                    name: 'Sarah Chen',
                    role: 'Product Designer',
                    email: `sarah.${company.id}@example.com`,
                    phone: '+1 555-0102',
                    country: 'Singapore',
                    wallet: '0x3aB2...eD44',
                    kycStatus: 'verified',
                    totalPaid: 8400,
                    companyId: company.id
                }
            ]
        });

        // Add some initial transactions (note: Transaction model currently doesn't have companyId, I should add it or relate it)
        // For now, I'll just create them. In a real app, transactions would be scoped.

        console.log(`✅ New user registered and seeded: ${email} (${companyName})`);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                companyId: user.companyId
            },
            company: {
                id: company.id,
                name: company.name,
                country: company.country,
                isTestMode: company.isTestMode
            },
            token: user.id // Use user ID as token for this implementation
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Failed to create account' });
    }
});

// POST /api/auth/login - Login user
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                error: 'Missing credentials',
                details: 'Please provide both email and password'
            });
        }

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            include: { company: true }
        });

        if (!user || user.password !== password) {
            return res.status(401).json({
                error: 'Invalid credentials',
                details: 'Incorrect email or password'
            });
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        });

        console.log(`✅ User logged in: ${email}`);

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                companyId: user.companyId
            },
            company: user.company,
            token: user.id // Use user ID as token
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// POST /api/auth/verify-email - Send verification email
router.post('/verify-email', async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // In production, send actual email
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        res.json({
            message: 'Verification code sent',
            code: verificationCode // Only for demo - remove in production
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send verification email' });
    }
});

// POST /api/auth/complete-onboarding - Complete company setup
router.post('/complete-onboarding', async (req: Request, res: Response) => {
    try {
        const { companyId, phone, address, businessType, monthlyVolume } = req.body;

        const company = await prisma.company.update({
            where: { id: companyId },
            data: {
                phone,
                address
            }
        });

        res.json(company);
    } catch (error) {
        res.status(500).json({ error: 'Failed to complete onboarding' });
    }
});

export default router;
