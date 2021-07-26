export const hasOnlyExpectedTestArgs = <TestArgs>(
  expectedTestArgs: string[],
  optionalTestArgs: string[],
  testArgs: Partial<TestArgs>
): testArgs is TestArgs =>
  Object.keys(testArgs).every(
    (testArg) =>
      expectedTestArgs.includes(testArg) || optionalTestArgs.includes(testArg)
  )
