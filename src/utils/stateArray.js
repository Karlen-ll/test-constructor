function changeArray(array, func) {
    const arr = [...array];
    func(arr);
    return arr;
}

function addByIndex(array, value, index = 0) {
    return changeArray(array, arr => arr.splice(index, 0, value));
}

function changeArrayValue(array, key, value, index = 0, service = {}) {
    return changeArray(array, arr => arr[index] = {
        ...array[index],
        [key]: value,
        ...service
    });
}

function moveArrayItem(array, from = 0, to = 0) {
    return changeArray(array, arr => arr.splice(to, 0, arr.splice(from, 1)[0]));
}

function removeArrayItem(array, index = 0) {
    return changeArray(array, arr => arr.splice(index, 1));
}

export { addByIndex, changeArrayValue, moveArrayItem, removeArrayItem };