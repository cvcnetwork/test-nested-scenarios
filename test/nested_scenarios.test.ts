import { testNestedScenarios } from '../src'
import type { NestedTest } from '../src/nested_test'

type TestArgs = {
  array: string[]
  boolean: boolean
  numeric: number
  record: Record<string, Record<string, number>>
}

describe('testNestedScenarios,', () => {
  const runTest: NestedTest.RunTestFunction<TestArgs> = ({
    array,
    boolean,
    numeric,
    record,
  }) => {
    it('assembles the test correctly', () => {
      expect(expect.getState().currentTestName).toEqual(
        [
          `testNestedScenarios`,
          `array: ${JSON.stringify(array)}`,
          `boolean: ${JSON.stringify(boolean)}`,
          `numeric: ${JSON.stringify(numeric)}`,
          `record: ${JSON.stringify(record)}`,
          `assembles the test correctly`,
        ].join(', ')
      )
    })
  }

  const testByArrayArgument: NestedTest.Scenario<TestArgs> = (addTest) =>
    describe('array:', () => {
      describe(JSON.stringify(['a', 'b', 'c']) + ',', () => {
        addTest({ array: ['a', 'b', 'c'] })
      })

      describe(JSON.stringify(['c', 'd', 'e']) + ',', () => {
        addTest({ array: ['c', 'd', 'e'] })
      })
    })

  const testByBooleanArgument: NestedTest.Scenario<TestArgs> = (addTest) =>
    describe('boolean:', () => {
      describe(JSON.stringify(false) + ',', () => {
        addTest({ boolean: false })
      })

      describe(JSON.stringify(true) + ',', () => {
        addTest({ boolean: true })
      })
    })

  const testByNumericArgument: NestedTest.Scenario<TestArgs> = (addTest) =>
    describe('numeric:', () => {
      describe(JSON.stringify(21) + ',', () => {
        addTest({ numeric: 21 })
      })

      describe(JSON.stringify(42) + ',', () => {
        addTest({ numeric: 42 })
      })
    })

  const testByRecordArgument: NestedTest.Scenario<TestArgs> = (addTest) =>
    describe('record:', () => {
      const firstRecord = { a: { b: 1 }, b: { c: 2 } }
      const secondRecord = { c: { d: 3 }, b: { c: 2 } }

      describe(JSON.stringify(firstRecord) + ',', () => {
        addTest({ record: firstRecord })
      })

      describe(JSON.stringify(secondRecord) + ',', () => {
        addTest({ record: secondRecord })
      })
    })

  testNestedScenarios({
    expectedTestArgs: ['array', 'boolean', 'numeric', 'record'],
    runTest,
    scenarios: [
      testByArrayArgument,
      testByBooleanArgument,
      testByNumericArgument,
      testByRecordArgument,
    ],
  })
})
