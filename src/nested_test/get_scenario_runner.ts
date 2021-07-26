import cloneDeep from 'lodash.clonedeep'
import merge from 'lodash.merge'

import type { NestedTest } from '.'

export const curryScenarioRunner = <TestArgs>(
  scenario: NestedTest.Scenario<TestArgs>
): NestedTest.ScenarioRunner<TestArgs> => {
  const updateRunTestArgs = (
    testArgs: Partial<TestArgs>
  ): ReturnType<NestedTest.ScenarioRunner<TestArgs>> => {
    const runNextScenario = (
      previousScenarios: NestedTest.PartialRunTestFunction<TestArgs>
    ): void =>
      scenario((updates) =>
        previousScenarios(merge(cloneDeep(testArgs), updates))
      )
    return runNextScenario
  }
  return updateRunTestArgs
}
