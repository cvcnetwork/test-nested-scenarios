export namespace NestedTest {
  export type AddTestFunction<TestArgs> = (updates: Partial<TestArgs>) => void

  export type PartialRunTestFunction<TestArgs> = (
    testArgs: Partial<TestArgs>
  ) => void

  export type RunTestFunction<TestArgs> = (testArgs: TestArgs) => void

  export type Scenario<TestArgs> = (addTest: AddTestFunction<TestArgs>) => void

  export type ScenarioRunner<TestArgs> = (
    testArgs: Partial<TestArgs>
  ) => (previousScenarios: PartialRunTestFunction<TestArgs>) => void
}

export { buildScenarioStack } from './build_scenario_stack'
export { curryPartialRunTest } from './get_partial_run_test_function'
export { curryScenarioRunner } from './get_scenario_runner'
