import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/context/_context/route-a/')({
  component: RouteComponent,
  loader: ({ context: { someData } }) => {
    console.log(someData)
  },
})

function RouteComponent() {
  return <div>Hello "/_context/route-a/"!</div>
}
