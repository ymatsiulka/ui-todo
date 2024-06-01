export const loadFromLocalStorage = <T>(key: string): T | undefined => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData) as T;
  } catch (err) {
    console.error('Could not load data from localStorage', err);
    return undefined;
  }
};

export const saveToLocalStorage = (key: string, data: any): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (err) {
    console.error('Could not save data to localStorage', err);
  }
};
