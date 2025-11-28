import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/router_state/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/router_state/"!</div>
}
