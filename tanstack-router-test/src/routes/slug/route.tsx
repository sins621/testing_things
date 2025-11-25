import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>Outlet File</div>
      <Outlet />
    </>
  )
}
