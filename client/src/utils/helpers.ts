export const generateItems = (count: any, creator: any): any => {
    const result = []
    for (let i = 0; i < count; i++) {
        result.push(creator(i))
    }
    return result
}

export const applyDrag = (arr: any, dragResult: any) => {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr

    const result = [...arr]
    let itemToAdd = payload

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
    }

    return result
}

// Slow for big arrays
// TODO: Implement something faster
export const groupBy = (items: any, key: any) => items.reduce(
    (result: any, item: any) => ({
        ...result,
        [item[key]]: [
            ...(result[item[key]] || []),
            item,
        ],
    }),
    {},
);