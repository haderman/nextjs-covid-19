import { useState } from "react";

export default function usePersistedState(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => getStoredItem(key, initialValue));

  function setValue(value) {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    }
  }
  return [storedValue, setValue];
}

function getStoredItem(key, defaultValue) {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
}
