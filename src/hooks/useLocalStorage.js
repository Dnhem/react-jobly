import { useState, useEffect } from "react";

const useLocalStorage = (key, firstVal = null) => {
  const initialItem = localStorage.getItem(key) || firstVal;

  const [ item, setItem ] = useState(initialItem);

  useEffect(
    function setKeyInStorage() {
      item === null
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, item);
    },
    [ item, key ]
  );

  return [ item, setItem ];
};

export default useLocalStorage;
