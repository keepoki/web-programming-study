export function splitArray<T>(arr: T[], chunkSize: number) {
  if (!arr || arr.length === 0) return null;

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  return result;
}
