import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Returns the string key value of the given date
 * @param {Date} date 
 * @returns 
 */
function getDateKey(date) {
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();

        return `@${year}${month}${day}`;
}

export async function medStatusOfDate(date) {
        try {
                return await AsyncStorage.getItem(getDateKey(date));
        } catch (e) {
                // error
        }
}

export async function setMedsTakenForDate(date) {
        try {
                let value = `${date.getHours()}:${date.getMinutes()}`;
                await AsyncStorage.setItem(getDateKey(date), value);
                return value;
        } catch (e) {
                console.log(e);
                return -1;
        }
}

export async function unsetMedsTakenForDate(date) {
        try {
                await AsyncStorage.removeItem(getDateKey(date));
        } catch (e) {
                // error
        }
}