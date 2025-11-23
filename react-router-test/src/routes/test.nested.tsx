import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test/nested')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/test/nested"!</div>
}
