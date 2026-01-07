import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Cleanup old data (Order is important: Children first, then Parents)
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  console.log('Seed: Data cleared')

  // 2. Create Users and fetch them to get real IDs
  await prisma.user.createMany({
    data: [
      { username: 'johndoe', email: 'john@example.com' },
      { username: 'janedoe', email: 'jane@example.com' },
      { username: 'alice', email: 'alice@example.com' },
      { username: 'bob', email: 'bob@example.com' }
    ]
  })
  const allUsers = await prisma.user.findMany()

  // 3. Create Posts using IDs from the allUsers array
  await prisma.post.createMany({
    data: [
      { title: 'Prisma Advance Queries Guide', content: 'Learning pagination...', authorId: allUsers[0].id },
      { title: 'Understanding RESTful APIs', content: 'Deep dive...', authorId: allUsers[1].id },
      { title: 'JavaScript ES2024 Features', content: 'Exploring ES2024...', authorId: allUsers[2].id },
      { title: 'Web Security Essentials', content: 'Key practices...', authorId: allUsers[3].id },
      { title: 'CSS Grid vs. Flexbox', content: 'Layout guide...', authorId: allUsers[0].id }
    ]
  })
  const allPosts = await prisma.post.findMany()

  // 4. Create 15 Comments for the FIRST post to test your filters
  // We use the ID from allPosts[0] instead of post.id
  const commentData = Array.from({ length: 15 }).map((_, i) => ({
    text: `Insightful comment number ${i + 1}`,
    postId: allPosts[0].id,
    authorId: allUsers[Math.floor(Math.random() * allUsers.length)].id // Random user
  }))

  await prisma.comment.createMany({
    data: commentData
  })

  console.log(`Seed: Created ${allUsers.length} Users, ${allPosts.length} Posts, and 15 Comments ✅`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })