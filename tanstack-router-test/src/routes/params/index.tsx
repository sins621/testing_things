import { createFileRoute, Link, MatchRoute } from '@tanstack/react-router'
import { Suspense, use } from 'react'
import { z } from 'zod'

const postsSchema = z.object({
  userId: z.number().default(1).catch(1),
})

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const Route = createFileRoute('/params/')({
  validateSearch: postsSchema,
  beforeLoad: () => ({
    fetchPosts: async (userId: number, sleepMs: number) => {
      await sleep(sleepMs)
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      )
      if (!res.ok) throw new Error('Failed to fetch data')
      return res.json()
    },
  }),
  loaderDeps: ({ search: { userId } }) => ({ userId }),
  loader: async ({ context: { fetchPosts }, deps: { userId } }) => {
    return { slowData: fetchPosts(userId, 1000) }
  },
  component: RouteComponent,
  errorComponent: () => <div>Error</div>,
})

function RouteComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuspensedComponent />
    </Suspense>
  )
}

function SuspensedComponent() {
  const { slowData } = Route.useLoaderData()
  const data = use(slowData)

  return (
    <>
      <div>{JSON.stringify(data)}</div>
      <Link
        from={Route.fullPath}
        search={(prev) => ({ userId: (prev.userId ?? 0) + 1 })}
      >
        Next User
        <MatchRoute pending to={Route.fullPath}>
          <span className="font-bold text-2xl">
            THIS WOULD BE A LOADING SPINNER THING
          </span>
        </MatchRoute>
      </Link>
    </>
  )
}
