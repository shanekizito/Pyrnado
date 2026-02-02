import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    const demoCompanyId = 'demo-company-123';

    // Create demo company
    const company = await prisma.company.upsert({
        where: { id: demoCompanyId },
        update: {},
        create: {
            id: demoCompanyId,
            name: 'GlobalPay Demo Inc.',
            email: 'contact@globalpay.demo',
            phone: '+1 (555) 123-4567',
            country: 'United States',
            address: '123 Finance Street, New York, NY 10001',
            isTestMode: true
        }
    });

    console.log('✅ Created company:', company.name);

    // Create a demo user for this company
    const demoUser = await prisma.user.upsert({
        where: { email: 'demo@globalpay.com' },
        update: {},
        create: {
            id: 'demo-user-id',
            email: 'demo@globalpay.com',
            name: 'Demo User',
            password: 'password123',
            companyId: demoCompanyId
        }
    });

    console.log('✅ Created demo user:', demoUser.email);

    // Create assets
    const assets = await Promise.all([
        prisma.asset.upsert({
            where: { companyId_symbol: { companyId: demoCompanyId, symbol: 'USDC' } },
            update: {},
            create: {
                companyId: demoCompanyId,
                symbol: 'USDC',
                name: 'USD Coin',
                balance: 45230.50,
                usdValue: 45230.50,
                change24h: 0.01,
                chain: 'Ethereum',
                color: 'text-blue-500',
                icon: '/icons/usdc.png'
            }
        }),
        prisma.asset.upsert({
            where: { companyId_symbol: { companyId: demoCompanyId, symbol: 'USDT' } },
            update: {},
            create: {
                companyId: demoCompanyId,
                symbol: 'USDT',
                name: 'Tether',
                balance: 12450.00,
                usdValue: 12450.00,
                change24h: -0.02,
                chain: 'Ethereum',
                color: 'text-green-500',
                icon: 'https://img.icons8.com/color/96/tether.png'
            }
        }),
        prisma.asset.upsert({
            where: { companyId_symbol: { companyId: demoCompanyId, symbol: 'ETH' } },
            update: {},
            create: {
                companyId: demoCompanyId,
                symbol: 'ETH',
                name: 'Ethereum',
                balance: 3.56,
                usdValue: 8727.58,
                change24h: 2.34,
                chain: 'Ethereum',
                color: 'text-indigo-500',
                icon: '/icons/ethereum.png'
            }
        })
    ]);

    console.log('✅ Created', assets.length, 'assets');

    // Create recipients
    const recipients = await Promise.all([
        prisma.recipient.upsert({
            where: { id: 'demo-recipient-1' },
            update: {},
            create: {
                id: 'demo-recipient-1',
                companyId: demoCompanyId,
                name: 'Maria Garcia',
                email: 'maria@example.com',
                phone: '+52 555 1234567',
                country: 'Mexico',
                walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
            }
        }),
        prisma.recipient.upsert({
            where: { id: 'demo-recipient-2' },
            update: {},
            create: {
                id: 'demo-recipient-2',
                companyId: demoCompanyId,
                name: 'John Smith',
                email: 'john@example.com',
                phone: '+234 80 12345678',
                country: 'Nigeria',
                mobileNumber: '+234 80 12345678'
            }
        })
    ]);

    console.log('✅ Created', recipients.length, 'recipients');

    // Create workers
    const workers = await Promise.all([
        prisma.worker.upsert({
            where: { email: 'sarah.j@example.com' },
            update: {},
            create: {
                companyId: demoCompanyId,
                name: 'Sarah Johnson',
                role: 'Software Engineer',
                email: 'sarah.j@example.com',
                phone: '+1 555 0101',
                country: 'United States',
                wallet: '0x1234567890abcdef1234567890abcdef12345678',
                kycStatus: 'verified',
                totalPaid: 45000,
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
            }
        }),
        prisma.worker.upsert({
            where: { email: 'carlos.r@example.com' },
            update: {},
            create: {
                companyId: demoCompanyId,
                name: 'Carlos Rodriguez',
                role: 'Designer',
                email: 'carlos.r@example.com',
                phone: '+52 555 0202',
                country: 'Mexico',
                wallet: '0xabcdef1234567890abcdef1234567890abcdef12',
                kycStatus: 'verified',
                totalPaid: 32000,
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
            }
        })
    ]);

    console.log('✅ Created', workers.length, 'workers');

    // Create sample transactions
    const transactions = await Promise.all([
        prisma.transaction.create({
            data: {
                companyId: demoCompanyId,
                type: 'payroll',
                description: 'Payroll Batch #204',
                amount: 12450.00,
                currency: 'USDC',
                isIncoming: false,
                status: 'settled',
                fees: 12.45,
                chain: 'Ethereum',
                txHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890'
            }
        }),
        prisma.transaction.create({
            data: {
                companyId: demoCompanyId,
                type: 'deposit',
                description: 'Incoming Deposit',
                amount: 25000.00,
                currency: 'USDC',
                isIncoming: true,
                status: 'settled',
                chain: 'Ethereum',
                txHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
            }
        })
    ]);

    console.log('✅ Created', transactions.length, 'transactions');

    console.log('🎉 Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
