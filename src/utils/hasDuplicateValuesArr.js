export default function hasDuplicateValuesArr(arr) {
  return new Set(arr).size !== arr.length;
}
