-- AlterTable
ALTER TABLE "InventoryItem" ADD COLUMN     "normalizedName" TEXT;

-- CreateIndex
CREATE INDEX "InventoryItem_userId_normalizedName_idx" ON "InventoryItem"("userId", "normalizedName");
