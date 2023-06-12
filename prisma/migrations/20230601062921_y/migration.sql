-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Price" INTEGER NOT NULL,
    "ConsumerId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "product_id_key" ON "product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_ConsumerId_key" ON "product"("ConsumerId");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_ConsumerId_fkey" FOREIGN KEY ("ConsumerId") REFERENCES "user"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
