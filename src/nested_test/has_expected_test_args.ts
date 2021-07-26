export const hasExpectedTestArgs = <TestArgs>(
  expectedTestArgs: string[],
  testArgs: Partial<TestArgs>
): testArgs is TestArgs =>
  expectedTestArgs.every((expected) => testArgs.hasOwnProperty(expected))
