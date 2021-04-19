const
    getLocalStorageItem = key => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            // Send Error message
            console.warn('Invalid data for parsing...');
            return null;
        }
    },

    setLocalStorageItem = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            // Send Error message
            console.warn('Invalid data to stringify...');
        }
    },

    getArrayFromLocalStorage = (key, defaultValue = []) => {
        let value = getLocalStorageItem(key);
        // Check and send data
        return !value || !Array.isArray(value) ? defaultValue : value;
    };

export { getLocalStorageItem, setLocalStorageItem, getArrayFromLocalStorage };
