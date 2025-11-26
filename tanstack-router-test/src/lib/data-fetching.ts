import { sleep } from './utils'

export async function fetchPosts(userId: number, sleepMs: number) {
  console.info("Fetching Posts")
  await sleep(sleepMs)
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  )
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}
