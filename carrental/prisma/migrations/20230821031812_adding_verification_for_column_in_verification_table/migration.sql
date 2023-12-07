-- CreateEnum
CREATE TYPE "VerificationFor" AS ENUM ('EMAIL', 'PHONE');

-- AlterTable
ALTER TABLE "VerificationCode" ADD COLUMN     "codeFor" "VerificationFor" NOT NULL DEFAULT 'EMAIL';
