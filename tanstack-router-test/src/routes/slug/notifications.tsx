import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/slug/notifications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings/notifications"!</div>
}
