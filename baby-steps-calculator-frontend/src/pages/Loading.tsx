import { useEffect, useState } from "react"

const statusSteps = [
  "Calculating savings",
  "Compounding interest",
  "Putting it all together",
]

export default function Loading() {
  const [progress, setProgress] = useState(0)

  const progressLabel = `${Math.min(progress, 100)}%`
  const status =
    statusSteps[Math.min(Math.floor(progress / 34), statusSteps.length - 1)]

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + Math.floor(Math.random() * 6) + 4, 100)
        return next
      })
    }, 160)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="min-h-dvh flex items-center justify-center p-8 bg-base-200">
      <div className="w-full max-w-xl rounded-3xl bg-base-100 p-10 shadow-xl">
        <div className="mb-6 text-center">
          <div className="text-sm uppercase tracking-[0.3em] text-base-content/50">
            Processing your plan
          </div>
          <h1 className="mt-4 text-3xl font-bold">Crunching the numbers</h1>
          <p className="mt-2 text-base-content/70">
            {status}. This will only take a moment.
          </p>
        </div>
        <div className="rounded-full bg-base-200 h-4 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full bg-linear-to-r from-primary to-secondary transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-base-content/70">
          <span>{progressLabel}</span>
          <span>{status}</span>
        </div>
      </div>
    </div>
  )
}
