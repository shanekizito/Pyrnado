# Pyrnado (Global Pay Flow)

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Status](https://img.shields.io/badge/status-Active-success.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)

**Pyrnado** is an enterprise-grade financial operations platform engineered for the future of global business. It bridges the gap between traditional finance and blockchain technology, offering a unified dashboard for global liquidity management, automated payroll, milestone-based escrow, and cross-border remittances.

Designed for scalability and security, Pyrnado empowers organizations to manage multi-chain treasury assets alongside fiat operations with bank-grade compliance and real-time analytics.

---

## 🚀 Key Capabilities

### 🌐 Unified Treasury Management
- **Multi-Chain Asset Control:** Manage portfolios across Ethereum, Polygon, Arbitrum, and Optimism from a single view.
- **Real-Time Analytics:** Live liquidity position tracking, FX rates, and capital allocation breakdowns.
- **Instant Swaps:** Integrated DEX functionality for seamless asset exchange.

### 💸 Global Payroll Engine
- **Batch Processing:** Execute payments for hundreds of workers simultaneously with dual-approval workflows.
- **Hybrid Payouts:** Support for crypto wallets and traditional bank transfers.
- **Worker Management:** comprehensive profiles with KYC status and payment history.

### 🤝 Secure Escrow Contracts
- **Milestone-Based Releases:** Funds are locked in smart contracts and released only upon verified deliverables.
- **Dispute Resolution:** Built-in arbitration workflows to handle disagreements fairly.
- **Multi-Signature Security:** Enhanced protection for high-value contracts.

### 🌍 Cross-Border Remittance
- **Global Reach:** Send money to 180+ countries via Bank Transfer, Mobile Money, or Cash Pickup.
- **Competitive FX:** Real-time transparent exchange rates with low fees.
- **Live Tracking:** End-to-end visibility of transfer status from initiation to delivery.

### 🛡️ Enterprise Compliance
- **Integrated KYC/AML:** Automated identity verification and risk screening.
- **Audit Trails:** Immutable logs for every transaction and administrative action.
- **Role-Based Access:** Granular permissions for Admins, Managers, and Operators.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **State Management:** React Context & [TanStack Query](https://tanstack.com/query/latest)
- **Visualization:** [Recharts](https://recharts.org/) for analytics & [Framer Motion](https://www.framer.com/motion/) for animations
- **Forms:** React Hook Form + Zod validation

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Database:** PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication:** JWT-based session management with 2FA support
- **Blockchain Integration:** Web3.js / Ethers.js for smart contract interaction

---

## 🏁 Getting Started

### Prerequisites
- Node.js > v18.0.0
- npm or yarn or bun
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shanekizito/Pyrnado.git
   cd Pyrnado
   ```

2. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` in both root and backend directories.
   - Configure your database URL and API keys in the `.env` files.

4. **Run the Application**
   ```bash
   # Start the backend server
   cd backend
   npm run dev

   # Start the frontend development server (in a new terminal)
   # from the root directory
   npm run dev
   ```

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's reporting bugs, suggesting features, or submitting pull requests, your input is valuable.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by the Pyrnado Team
</p>
