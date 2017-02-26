export function sum(arr = []) {
  let sum = 0;

  for (let i = 0, n = arr.length; i < n; i++) {
    sum += arr[i];
  }

  return sum;
}

export function avg(arr = []) {
  return sum(arr) / arr.length;
}
