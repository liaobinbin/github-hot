import React from 'react';

/**
 * localStorage 持久化数据
 */
export const useStateWithLocalStorage = <T>(key: string, initVal: T): [string, (value: string) => void] => {
  if (typeof key !== 'string') {
    throw new Error('key must be a string');
  }

  let preStr;
  try {
    let localStr = localStorage.getItem(key);
    if (!localStr) {
      localStr = null; // 避免解析时报错，SyntaxError
    }
    preStr = JSON.parse(localStr as string); // 反序列化
  } catch (error) {
    console.error('useStateWithLocalStorage :>> ', error);
  }

  const [value, setValue] = React.useState<string>(preStr || initVal);

  React.useEffect(() => {
    localStorage.setItem(String(key), JSON.stringify(value)); // 序列化
  }, [value]);

  return [value, setValue];
};
