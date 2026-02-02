/*
  Warnings:

  - Added the required column `companyId` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `ComplianceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `PayrollBatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Recipient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Remittance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Swap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "totalPayouts" REAL NOT NULL DEFAULT 0,
    "completedTransactions" INTEGER NOT NULL DEFAULT 0,
    "pendingPayouts" REAL NOT NULL DEFAULT 0,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "joinedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Agent_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Agent" ("completedTransactions", "country", "createdAt", "email", "id", "joinedDate", "location", "name", "pendingPayouts", "phone", "rating", "status", "totalPayouts", "updatedAt") SELECT "completedTransactions", "country", "createdAt", "email", "id", "joinedDate", "location", "name", "pendingPayouts", "phone", "rating", "status", "totalPayouts", "updatedAt" FROM "Agent";
DROP TABLE "Agent";
ALTER TABLE "new_Agent" RENAME TO "Agent";
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");
CREATE TABLE "new_Asset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "balance" REAL NOT NULL,
    "usdValue" REAL NOT NULL,
    "change24h" REAL NOT NULL,
    "chain" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Asset_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("balance", "chain", "change24h", "color", "createdAt", "icon", "id", "name", "symbol", "updatedAt", "usdValue") SELECT "balance", "chain", "change24h", "color", "createdAt", "icon", "id", "name", "symbol", "updatedAt", "usdValue" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
CREATE UNIQUE INDEX "Asset_companyId_symbol_key" ON "Asset"("companyId", "symbol");
CREATE TABLE "new_ComplianceItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ComplianceItem_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ComplianceItem" ("createdAt", "date", "details", "entity", "id", "riskLevel", "status", "type", "updatedAt") SELECT "createdAt", "date", "details", "entity", "id", "riskLevel", "status", "type", "updatedAt" FROM "ComplianceItem";
DROP TABLE "ComplianceItem";
ALTER TABLE "new_ComplianceItem" RENAME TO "ComplianceItem";
CREATE TABLE "new_Contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "contractor" TEXT NOT NULL,
    "totalAmount" REAL NOT NULL,
    "lockedAmount" REAL NOT NULL,
    "releasedAmount" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "chain" TEXT NOT NULL,
    "contractAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Contract_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contract" ("chain", "client", "contractAddress", "contractor", "createdAt", "endDate", "id", "lockedAmount", "releasedAmount", "startDate", "status", "title", "totalAmount", "updatedAt") SELECT "chain", "client", "contractAddress", "contractor", "createdAt", "endDate", "id", "lockedAmount", "releasedAmount", "startDate", "status", "title", "totalAmount", "updatedAt" FROM "Contract";
DROP TABLE "Contract";
ALTER TABLE "new_Contract" RENAME TO "Contract";
CREATE TABLE "new_PayrollBatch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "workerCount" INTEGER NOT NULL,
    "totalAmount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scheduledDate" DATETIME,
    "completedDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PayrollBatch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PayrollBatch" ("completedDate", "createdAt", "createdDate", "id", "name", "scheduledDate", "status", "totalAmount", "updatedAt", "workerCount") SELECT "completedDate", "createdAt", "createdDate", "id", "name", "scheduledDate", "status", "totalAmount", "updatedAt", "workerCount" FROM "PayrollBatch";
DROP TABLE "PayrollBatch";
ALTER TABLE "new_PayrollBatch" RENAME TO "PayrollBatch";
CREATE TABLE "new_Recipient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "walletAddress" TEXT,
    "bankAccount" TEXT,
    "mobileNumber" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Recipient_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipient" ("bankAccount", "country", "createdAt", "email", "id", "mobileNumber", "name", "phone", "updatedAt", "walletAddress") SELECT "bankAccount", "country", "createdAt", "email", "id", "mobileNumber", "name", "phone", "updatedAt", "walletAddress" FROM "Recipient";
DROP TABLE "Recipient";
ALTER TABLE "new_Recipient" RENAME TO "Recipient";
CREATE TABLE "new_Remittance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "recipientCountry" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USDC',
    "localAmount" REAL NOT NULL,
    "localCurrency" TEXT NOT NULL,
    "fxRate" REAL NOT NULL,
    "fee" REAL NOT NULL,
    "deliveryMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedDate" DATETIME,
    "txHash" TEXT,
    "chain" TEXT,
    "agentLocation" TEXT,
    "pickupCode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Remittance_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Remittance_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Remittance" ("agentLocation", "amount", "chain", "completedDate", "createdAt", "createdDate", "currency", "deliveryMethod", "fee", "fxRate", "id", "localAmount", "localCurrency", "pickupCode", "recipientCountry", "recipientId", "sender", "status", "txHash", "updatedAt") SELECT "agentLocation", "amount", "chain", "completedDate", "createdAt", "createdDate", "currency", "deliveryMethod", "fee", "fxRate", "id", "localAmount", "localCurrency", "pickupCode", "recipientCountry", "recipientId", "sender", "status", "txHash", "updatedAt" FROM "Remittance";
DROP TABLE "Remittance";
ALTER TABLE "new_Remittance" RENAME TO "Remittance";
CREATE TABLE "new_Swap" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "fromAsset" TEXT NOT NULL,
    "toAsset" TEXT NOT NULL,
    "fromAmount" REAL NOT NULL,
    "toAmount" REAL NOT NULL,
    "rate" REAL NOT NULL,
    "fee" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "txHash" TEXT,
    "chain" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Swap_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Swap" ("chain", "createdAt", "fee", "fromAmount", "fromAsset", "id", "rate", "status", "toAmount", "toAsset", "txHash", "updatedAt") SELECT "chain", "createdAt", "fee", "fromAmount", "fromAsset", "id", "rate", "status", "toAmount", "toAsset", "txHash", "updatedAt" FROM "Swap";
DROP TABLE "Swap";
ALTER TABLE "new_Swap" RENAME TO "Swap";
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USDC',
    "isIncoming" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fees" REAL,
    "chain" TEXT,
    "txHash" TEXT,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Transaction_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "chain", "createdAt", "currency", "description", "fees", "id", "isIncoming", "metadata", "status", "timestamp", "txHash", "type", "updatedAt") SELECT "amount", "chain", "createdAt", "currency", "description", "fees", "id", "isIncoming", "metadata", "status", "timestamp", "txHash", "type", "updatedAt" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE TABLE "new_Worker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "bankAccount" TEXT,
    "kycStatus" TEXT NOT NULL,
    "lastPayment" DATETIME,
    "totalPaid" REAL NOT NULL DEFAULT 0,
    "avatar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Worker_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Worker" ("avatar", "bankAccount", "country", "createdAt", "email", "id", "kycStatus", "lastPayment", "name", "phone", "role", "totalPaid", "updatedAt", "wallet") SELECT "avatar", "bankAccount", "country", "createdAt", "email", "id", "kycStatus", "lastPayment", "name", "phone", "role", "totalPaid", "updatedAt", "wallet" FROM "Worker";
DROP TABLE "Worker";
ALTER TABLE "new_Worker" RENAME TO "Worker";
CREATE UNIQUE INDEX "Worker_email_key" ON "Worker"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
