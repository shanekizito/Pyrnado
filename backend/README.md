# GlobalPay Backend API

Backend API server for the GlobalPay application, providing RESTful endpoints for all dashboard functionality.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT (placeholder implementation)

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed
```

### 3. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/balance` - Get balance breakdown
- `GET /api/dashboard/transactions` - Get recent transactions
- `GET /api/dashboard/activity` - Get activity feed

### Remittance
- `GET /api/remittance` - List remittances
- `POST /api/remittance` - Create remittance
- `GET /api/remittance/:id` - Get remittance details
- `POST /api/remittance/:id/cancel` - Cancel remittance
- `GET /api/remittance/recipients/list` - List recipients
- `POST /api/remittance/recipients/add` - Add recipient

### Payroll
- `GET /api/payroll/batches` - List payroll batches
- `POST /api/payroll/batches` - Create batch
- `POST /api/payroll/batches/:id/approve` - Approve batch
- `POST /api/payroll/batches/:id/execute` - Execute batch
- `GET /api/payroll/workers` - List workers
- `POST /api/payroll/workers` - Add worker
- `PUT /api/payroll/workers/:id` - Update worker
- `DELETE /api/payroll/workers/:id` - Remove worker

### Treasury
- `GET /api/treasury/assets` - List assets
- `GET /api/treasury/portfolio` - Portfolio summary
- `POST /api/treasury/swap` - Execute swap
- `POST /api/treasury/deposit` - Deposit funds
- `POST /api/treasury/withdraw` - Withdraw funds

### Escrow
- `GET /api/escrow/contracts` - List contracts
- `POST /api/escrow/contracts` - Create contract
- `POST /api/escrow/contracts/:contractId/release` - Release funds
- `POST /api/escrow/contracts/:id/dispute` - Raise dispute

### Analytics
- `GET /api/analytics/overview` - Analytics overview
- `GET /api/analytics/transactions` - Transaction analytics
- `GET /api/analytics/revenue` - Revenue data
- `GET /api/analytics/geography` - Geographic distribution
- `GET /api/analytics/export` - Export data

### Compliance
- `GET /api/compliance/items` - List compliance items
- `POST /api/compliance/kyc` - Submit KYC
- `POST /api/compliance/aml` - Run AML check
- `GET /api/compliance/reports` - Compliance reports

### Agents
- `GET /api/agents` - List agents
- `POST /api/agents` - Register agent
- `POST /api/agents/:id/activate` - Activate agent
- `POST /api/agents/:id/deactivate` - Deactivate agent

### Settings
- `GET /api/settings/profile` - Get company profile
- `PUT /api/settings/profile` - Update profile
- `GET /api/settings/api-keys` - List API keys
- `POST /api/settings/api-keys` - Generate API key
- `DELETE /api/settings/api-keys/:id` - Revoke API key
- `GET /api/settings/webhooks` - List webhooks
- `POST /api/settings/webhooks` - Create webhook
- `PUT /api/settings/webhooks/:id` - Update webhook
- `DELETE /api/settings/webhooks/:id` - Delete webhook

## Development Tools

### Prisma Studio
View and edit database data in a GUI:
```bash
npm run prisma:studio
```

### Build for Production
```bash
npm run build
npm start
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=3001
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```
