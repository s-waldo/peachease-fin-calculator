import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useGlobalStore } from "../utils/state/globalState"

export default function Results() {
  // Dummy data
  const prevStep = useGlobalStore(state => state.prevStep)
  const financialFreedomPossible = true
  const millionNetWorthDate = "2032-06-15"
  const projectedRetirement = "2045-03-20"

  const netWorthProjection = [
    { year: 2024, netWorth: 0.15 },
    { year: 2027, netWorth: 0.35 },
    { year: 2032, netWorth: 1.0 },
    { year: 2037, netWorth: 1.8 },
    { year: 2042, netWorth: 2.5 },
    { year: 2045, netWorth: 3.2 },
  ]

  const babySteps = [
    {
      step: 1,
      name: "Emergency Fund ($1,000)",
      description: "Build a small emergency fund",
      completed: true,
      dateCompleted: "2024-03-10",
    },
    {
      step: 2,
      name: "Debt Snowball",
      description: "Pay off all non-mortgage debt",
      completed: true,
      dateCompleted: "2026-11-20",
    },
    {
      step: 3,
      name: "Full Emergency Fund (3-6 months)",
      description: "Save 3-6 months of expenses",
      completed: false,
      dateCompleted: "2028-06-15",
    },
    {
      step: 4,
      name: "Retirement Investing (15%)",
      description: "Invest 15% of gross income",
      completed: false,
      dateCompleted: "2028-06-15",
    },
    {
      step: 5,
      name: "College Savings",
      description: "Save for children's education",
      completed: false,
      dateCompleted: "2030-01-10",
    },
    {
      step: 6,
      name: "Pay Off Home Early",
      description: "Accelerate mortgage payments",
      completed: false,
      dateCompleted: "2035-05-30",
    },
    {
      step: 7,
      name: "Build Wealth & Give",
      description: "Invest and support causes",
      completed: false,
      dateCompleted: "2035-05-30",
    },
  ]

  return (
    <div className="min-h-dvh p-8">
      <div className="w-full max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-base-content">
          Your Financial Freedom Plan
        </h1>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Financial Freedom Card */}
          <div className="card bg-base-100 shadow-lg lg:col-span-2">
            <div className="card-body">
              <h2 className="card-title text-lg">Financial Freedom</h2>
              <div className="flex items-center gap-4 mt-4">
                <div
                  className={`badge badge-lg ${
                    financialFreedomPossible ? "badge-success" : "badge-error"
                  }`}
                >
                  {financialFreedomPossible ? "POSSIBLE" : "NEEDS WORK"}
                </div>
              </div>
              <p className="text-sm text-base-content/70 mt-4">
                {financialFreedomPossible
                  ? "You're on track to achieve financial freedom!"
                  : "Let's adjust your plan to reach freedom."}
              </p>
            </div>
          </div>

          {/* Million Net Worth Card */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-lg">$1M Net Worth</h2>
              <div className="text-3xl font-bold text-success mt-4">
                {new Date(millionNetWorthDate).getFullYear()}
              </div>
              <p className="text-sm text-base-content/70 mt-2">
                {new Date(millionNetWorthDate).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Projected Retirement Card */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-lg">Projected Retirement</h2>
              <div className="text-3xl font-bold text-primary mt-4">
                {new Date(projectedRetirement).getFullYear()}
              </div>
              <p className="text-sm text-base-content/70 mt-2">
                {new Date(projectedRetirement).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Net Worth Projection Chart */}
        <div className="card bg-base-100 shadow-lg mb-8">
          <div className="card-body">
            <h2 className="card-title text-xl mb-6">Net Worth Projection</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={netWorthProjection}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  label={{
                    value: "Net Worth (Millions)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip formatter={(value) => `$${value}M`} />
                <Legend />
                <Bar
                  dataKey="netWorth"
                  fill="#4f46e5"
                  name="Projected Net Worth"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Baby Steps Timeline */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title flex-col text-xl mb-6">
              Recommended Financial Plan:
              <span>
                <strong>Dave Ramsey's Baby Steps</strong>
              </span>
            </h2>
            <div className="space-y-4">
              {babySteps.map((step) => (
                <div
                  key={step.step}
                  className={`card border-l-4 ${
                    step.completed
                      ? "border-success bg-success/10"
                      : "border-warning bg-warning/10"
                  }`}
                >
                  <div className="card-body p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">
                          Step {step.step}: {step.name}
                        </h3>
                        <p className="text-sm text-base-content/70 mt-1">
                          {step.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div
                          className={`badge ${
                            step.completed ? "badge-success" : "badge-warning"
                          }`}
                        >
                          {step.completed ? "✓ Completed" : "In Progress"}
                        </div>
                        {step.dateCompleted && (
                          <span className="text-xs text-base-content/60">
                            {new Date(step.dateCompleted).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-center">
          <button className="btn btn-primary" onClick={prevStep}>Adjust Plan</button>
          <button className="btn btn-ghost">Download Report</button>
        </div>
      </div>
    </div>
  )
}
