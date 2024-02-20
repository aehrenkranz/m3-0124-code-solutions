import { useCallback, useEffect, useState } from 'react';

export function Counter() {
  const getDataCallback = useCallback(function getData() {
    // fetch data
    return { foo: 'bar' };
  }, []);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    getDataCallback();
    setCounter((prev) => prev + 1);
  }, []);

  return <div>Fetching {counter} times</div>;
}
