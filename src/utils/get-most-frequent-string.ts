/**
 * Returns the most frequent string in an array of strings.
 * @param arr An array of strings.
 * @returns The most frequent string in the array.
 */
export function getMostFrequentString(arr: string[]) {
    const hashmap = arr.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    return Object.keys(hashmap).reduce((a, b) =>
        hashmap[a] > hashmap[b] ? a : b,
    )
}
