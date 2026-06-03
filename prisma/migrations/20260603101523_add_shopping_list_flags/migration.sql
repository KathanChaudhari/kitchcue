/*
  Warnings:

  - You are about to drop the column `notes` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseDate` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `storageLocation` on the `InventoryItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InventoryItem" DROP COLUMN "notes",
DROP COLUMN "purchaseDate",
DROP COLUMN "status",
DROP COLUMN "storageLocation",
ADD COLUMN     "isPurchased" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isShoppingList" BOOLEAN NOT NULL DEFAULT false;
