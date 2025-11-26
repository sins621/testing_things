import {
  createFileRoute,
  Link,
  MatchRoute,
  useNavigate,
} from '@tanstack/react-router'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const navigate = useNavigate()

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
        <Link to="/test">Test</Link>
        <Link to="/slug/$slug" params={{ slug: '3' }} preload="intent">
          Test
          <MatchRoute to="/slug/$slug" pending>
            <span>Loading...</span>
          </MatchRoute>
        </Link>
        <Link to="/params">To Params</Link>
        <Link to="/query">To Query</Link>
        <button
          style={{ cursor: 'pointer' }}
          onClick={() => navigate({ to: '/slug' })}
        >
          Navigate
        </button>
      </header>
    </div>
  )
}
