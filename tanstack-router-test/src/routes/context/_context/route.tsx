import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/context/_context')({
  component: RouteComponent,
  beforeLoad: () => ({ someData: 'someData' }),
})

function RouteComponent() {
  return <Outlet />
}
