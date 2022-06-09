/**
 * 格式化成千分位
 * @param {number | string} num
 * */
export const formatNumber = (num: string | number) => {
  const reg = /(?!^)(?=(\d{3})+$)/g;
  return String.prototype.replace.call(num, reg, ',');
};
