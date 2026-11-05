export function deepClone(object) {
    return JSON.parse(JSON.stringify(object));
}
export function isSorted(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== i) return false;
    }
    return true;
}

export function shuffle(n) {
  const arr = Array.from({ length: n }, (_, i) => i);
//   return arr;
  // Fisher-Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function convertTo2D(index, count) {
    return { y: Math.floor(index / count), x: index % count }
}