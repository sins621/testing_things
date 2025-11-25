import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/$settingsId')({
  loader: async ({ params }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${params.settingsId}`,
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
    </>
  )
}
