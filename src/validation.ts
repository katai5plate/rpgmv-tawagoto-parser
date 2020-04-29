export const isStringArray = (value: any): value is string[] => {
  if (value instanceof Array)
    return !value.map((x) => typeof x === "string").includes(false);
  return false;
};
export const lengthIs = (value: any[], count: number) => {
  if (value instanceof Array) return value.length === count;
  return false;
};
