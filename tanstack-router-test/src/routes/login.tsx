import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'

const loginSearchSchema = z.object({
  redirect: z.string().catch('').default(''),
})

export const Route = createFileRoute('/login')({
  validateSearch: loginSearchSchema,
  component: RouteComponent,
  loaderDeps: ({ search: { redirect } }) => ({ redirect }),
  loader: ({ deps: { redirect } }) => console.info('Redirect URI: ', redirect),
})

function RouteComponent() {
  return <div>Hello "/login"!</div>
}
