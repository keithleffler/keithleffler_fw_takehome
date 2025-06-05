export function findUniqueElements<T>(arr1: T[], arr2: T[]): T[] {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const uniqueElements = new Set<T>();

  for (const item of set1) {
    if (!set2.has(item)) {
      uniqueElements.add(item);
    }
  }

  for (const item of set2) {
    if (!set1.has(item)) {
      uniqueElements.add(item);
    }
  }

  return Array.from(uniqueElements);
}
