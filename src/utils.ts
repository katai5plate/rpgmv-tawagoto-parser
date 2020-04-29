export type InterpreterItem = {
  code: number;
  parameters: any[];
  indent: number;
};
export const createInterpreterItem = (
  code: number,
  parameters: any[],
  indent = 0
): InterpreterItem => ({
  code,
  parameters,
  indent,
});
