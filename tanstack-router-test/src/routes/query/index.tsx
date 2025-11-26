import { fetchPosts } from '@/lib/data-fetching'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

const postQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => fetchPosts(5, 1_000),
})

export const Route = createFileRoute('/query/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postQueryOptions),
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useSuspenseQuery(postQueryOptions)

  return <div>{JSON.stringify(data, null, 2)}</div>
}
