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
  const prevStep = useGlobalStore((state) => state.prevStep)
  const results = useGlobalStore((state) => state.results)
  const summary = useGlobalStore((state) => state.summary)
  const today = new Date()

  const modifiedResults = results.map((data, index) => ({
    month: index,
    netWorth: data.savings + data.retirementAccountBalance,
  }))
  const millionNetWorthDate = new Date(today)
  if (summary.millionDollarNetWorthMonth !== null) {
    millionNetWorthDate.setMonth(
      today.getMonth() + summary.millionDollarNetWorthMonth,
    )
  }

  const babySteps = summary.babySteps

  return (
    <div className="min-h-dvh p-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="flex gap-4 mb-8 justify-start">
          <button className="btn btn-primary" onClick={prevStep}>
            <i className="fa-solid fa-arrow-left"></i>Adjust Plan
          </button>
          {/* <button className="btn btn-ghost">Download Report</button> */}
        </div>
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
                <div className="badge badge-info badge-lg">
                  Baby Step {summary.currentBabyStep}
                </div>
                <div
                  className={`badge badge-lg ${
                    summary.financialFreedomPossible
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {summary.financialFreedomPossible ? "POSSIBLE" : "NEEDS WORK"}
                </div>
              </div>
              <p className="text-sm text-base-content/70 mt-4">
                {summary.financialFreedomPossible
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
              <h2 className="card-title text-lg">Net Worth at Retirement</h2>
              <div className="text-3xl font-bold text-primary mt-4">
                {summary.projectedRetirementNetWorth.toLocaleString("en-US", {
                  currency: "USD",
                  style: "currency",
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Net Worth Projection Chart */}
        <div className="card bg-base-100 shadow-lg mb-8">
          <div className="card-body">
            <h2 className="card-title text-xl mb-6">Net Worth Projection</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={modifiedResults}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  height={40}
                  label={{ value: "Year", position: "insideBottom" }}
                  tickFormatter={(data) =>
                    Number(data / 12)
                      .toFixed()
                      .toLocaleString()
                  }
                  interval={
                    modifiedResults.length > 10
                      ? Math.floor(modifiedResults.length / 10)
                      : 0
                  }
                />
                <YAxis
                  tickFormatter={(data) =>
                    Number(data / 1000000).toLocaleString() + "M"
                  }
                  label={{
                    value: "Net Worth",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                  labelFormatter={(value) => {
                    if (value % 12 === 0)
                      return `${Math.floor(value / 12)} years`
                    return `${Math.floor(value / 12)} years ${value % 12} months`
                  }}
                />
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
          <button className="btn btn-primary" onClick={prevStep}>
            Adjust Plan
          </button>
          {/* <button className="btn btn-ghost">Download Report</button> */}
        </div>
      </div>
    </div>
  )
}
