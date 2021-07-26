import type { NestedTest } from '.'

export const buildScenarioStack = <TestArgs>({
  partialRunTest,
  scenarioRunners,
}: {
  partialRunTest: NestedTest.PartialRunTestFunction<TestArgs>
  scenarioRunners: NestedTest.ScenarioRunner<TestArgs>[]
}): NestedTest.PartialRunTestFunction<TestArgs> =>
  scenarioRunners.reduce(
    (
        previousScenarios: NestedTest.PartialRunTestFunction<TestArgs>,
        updateRunTestArgs
      ): NestedTest.PartialRunTestFunction<TestArgs> =>
      (testArgs: Partial<TestArgs>) => {
        const runNextScenario = updateRunTestArgs(testArgs)
        return runNextScenario(previousScenarios)
      },
    partialRunTest
  )
