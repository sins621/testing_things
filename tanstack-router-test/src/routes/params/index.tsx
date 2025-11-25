import { createFileRoute, Link, MatchRoute } from '@tanstack/react-router'
import { z } from 'zod'

const postsSchema = z.object({
  userId: z.number().default(1).catch(1),
})

export const Route = createFileRoute('/params/')({
  validateSearch: postsSchema,
  loaderDeps: ({ search: { userId } }) => ({ userId }),
  loader: async ({ deps: { userId } }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    )
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return (
    <>
      <div>{JSON.stringify(data)}</div>
      <Link
        from={Route.fullPath}
        search={(prev) => ({ userId: prev.userId + 1 })}
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
