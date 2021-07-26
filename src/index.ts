import {
  buildScenarioStack,
  curryPartialRunTest,
  curryScenarioRunner,
} from './nested_test'
import type { NestedTest } from './nested_test'

export const testNestedScenarios = <TestArgs>({
  expectedTestArgs,
  optionalTestArgs = [],
  runTest,
  scenarios,
}: {
  expectedTestArgs: string[]
  optionalTestArgs?: string[]
  runTest: (testArgs: TestArgs) => void
  scenarios: NestedTest.Scenario<TestArgs>[]
}): void => {
  const runScenarioStack = buildScenarioStack({
    partialRunTest: curryPartialRunTest({
      expectedTestArgs,
      optionalTestArgs,
      runTest,
    }),
    scenarioRunners: scenarios.reverse().map(curryScenarioRunner),
  })

  runScenarioStack({})
}

export type { NestedTest }
