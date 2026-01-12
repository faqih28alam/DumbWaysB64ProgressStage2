// seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
  // Clear old data
  await prisma.order.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Users
  await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@example.com", password:"alice", points: 1500 },
      { name: "Bob", email: "bob@example.com", password:"bob", points: 800 },
      { name: "Charlie", email: "charlie@example.com", password:"charlie", points: 300 },
    ],
  });
  // Fetch them to get the IDs
  const users = await prisma.user.findMany();

  // 2. Create Products
  await prisma.product.createMany({
    data: [
      { name: "Keyboard", price: 350_000 },
      { name: "Mouse", price: 150_000 },
      { name: "Monitor", price: 1_500_000},
      { name: "Laptop", price: 8_000_000 },
      { name: "USB Hub", price: 100_000 },
    ],
  });
  // Fetch them to get the IDs
  const products = await prisma.product.findMany();

  // 3. Create Orders using the fetched arrays
  await prisma.order.createMany({
    data: [
      { userId: users[0].id, productId: products[0].id, quantity: 2 },
      { userId: users[0].id, productId: products[1].id, quantity: 1 },
      { userId: users[1].id, productId: products[2].id, quantity: 1 },
      { userId: users[2].id, productId: products[1].id, quantity: 4 },
    ],
  });
  // Fetch them to get the IDs
  const orders = await prisma.order.findMany();

  // 4. Create Suppliers
  await prisma.supplier.createMany({
    data: [
      { email: "tech@example", password: "tech" },
      { email: "office@example", password: "office" },
      { email: "store@example", password: "store" },
      { email: "warehouse@example", password: "warehouse" },
    ],
  });
  // Fetch them to get the IDs
  const suppliers = await prisma.supplier.findMany();

  // 5. Create Stocks using the fetched arrays
  await prisma.stock.createMany({
    data: [
      { productId: products[0].id, supplierId: suppliers[0].id, quantity: 50 },
      { productId: products[1].id, supplierId: suppliers[0].id, quantity: 100 },
      { productId: products[2].id, supplierId: suppliers[1].id, quantity: 20 },
      { productId: products[3].id, supplierId: suppliers[1].id, quantity: 10 },
      { productId: products[4].id, supplierId: suppliers[2].id, quantity: 200 },
    ],
  });
  // Fetch them to get the IDs
  const stocks = await prisma.stock.findMany();

  console.log({ users, products, stocks, suppliers });
}

main()
  .then(() => {
    console.log("Seeding completed ✅");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });