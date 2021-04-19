function changeArray(array, func) {
    const arr = [...array];
    func(arr);
    return arr;
}

/**
 * Create new array and add item by index */
function addByIndex(array, value, index = 0) {
    return changeArray(array, arr => arr.splice(index, 0, value));
}

/**
 * Create new array and change object value */
function changeArrayValue(array, key, value, index = 0, service = {}) {
    return changeArray(array, arr => arr[index] = {
        ...array[index],
        [key]: value,
        ...service
    });
}

/**
 * Create new array and move array element */
function moveArrayItem(array, from = 0, to = 0) {
    return changeArray(array, arr => arr.splice(to, 0, arr.splice(from, 1)[0]));
}

/**
 * Create new array and remove array element */
function removeArrayItem(array, index = 0) {
    return changeArray(array, arr => arr.splice(index, 1));
}

export { addByIndex, changeArrayValue, moveArrayItem, removeArrayItem };