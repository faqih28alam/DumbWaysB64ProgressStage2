import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
  // Clear old data
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Users
  await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@example.com", points: 1500 },
      { name: "Bob", email: "bob@example.com", points: 800 },
      { name: "Charlie", email: "charlie@example.com", points: 300 },
    ],
  });
  // Fetch them to get the IDs
  const users = await prisma.user.findMany();

  // 2. Create Products
  await prisma.product.createMany({
    data: [
      { name: "Keyboard", price: 350_000, stock: 12 },
      { name: "Mouse", price: 150_000, stock: 30 },
      { name: "Monitor", price: 1_500_000, stock: 5 },
      { name: "Laptop", price: 8_000_000, stock: 3 },
      { name: "USB Hub", price: 100_000, stock: 50 },
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