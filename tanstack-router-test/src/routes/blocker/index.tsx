import { createFileRoute, useBlocker } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/blocker/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [formIsDirty, setFormIsDirty] = useState(false)

  const { proceed, reset, status } = useBlocker({
    shouldBlockFn: () => formIsDirty,
    enableBeforeUnload: formIsDirty,
    withResolver: true,
  })

  return (
    <div className="mx-auto flex justify-center">
      <div className="flex flex-col">
        <label>Blocking Text</label>
        <input
          className="border border-black rounded-2xl"
          onChange={() => setFormIsDirty(true)}
        />
      </div>
      {status === 'blocked' && (
        <div>
          <p>Are you sure you want to leave?</p>
          <button onClick={proceed}>Yes</button>
          <button onClick={reset}>No</button>
        </div>
      )}
    </div>
  )
}
