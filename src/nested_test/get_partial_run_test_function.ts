import difference from 'lodash.difference'

import { hasExpectedTestArgs } from './has_expected_test_args'
import { hasOnlyExpectedTestArgs } from './has_only_expected_test_args'
import type { NestedTest } from '.'

export const curryPartialRunTest =
  <TestArgs>({
    expectedTestArgs,
    optionalTestArgs,
    runTest,
  }: {
    expectedTestArgs: string[]
    optionalTestArgs: string[]
    runTest: NestedTest.RunTestFunction<TestArgs>
  }): NestedTest.PartialRunTestFunction<TestArgs> =>
  (testArgs): void => {
    if (!hasExpectedTestArgs(expectedTestArgs, testArgs)) {
      throw new Error(
        `Nested scenarios failed to supply the expected TestArgs: ${difference(
          expectedTestArgs,
          Object.keys(testArgs)
        )}
      }.`
      )
    }

    if (
      !hasOnlyExpectedTestArgs(expectedTestArgs, optionalTestArgs, testArgs)
    ) {
      throw new Error(
        `Nested scenarios supplied unexpected TestArgs: ${difference(
          Object.keys(testArgs),
          expectedTestArgs
        )}
      }.`
      )
    }

    return runTest(testArgs)
  }
