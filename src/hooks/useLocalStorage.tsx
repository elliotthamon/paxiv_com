import { useState } from "react";

// source https://usehooks.com/useLocalStorage/

const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState<any>(() => {
    try {
      const item = localStorage.getItem(key);
      if (!item && initialValue) {
        localStorage.setItem(key, JSON.stringify(initialValue));
      }
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const updateValue = (data: any) => {
    try {
      setStoredValue(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, updateValue, removeValue];
};

export default useLocalStorage;
