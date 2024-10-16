export const deepClone = (obj, hash = new WeakMap()) => {
  // 基本类型直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // 处理日期对象
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // 处理正则表达式对象
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags);
  }

  // 处理函数
  if (typeof obj === 'function') {
    return obj.bind({});
  }

  // 处理Map对象
  if (obj instanceof Map) {
    const result = new Map();
    hash.set(obj, result);
    obj.forEach((value, key) => {
      result.set(key, deepClone(value, hash));
    });
    return result;
  }

  // 处理Set对象
  if (obj instanceof Set) {
    const result = new Set();
    hash.set(obj, result);
    obj.forEach(value => {
      result.add(deepClone(value, hash));
    });
    return result;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    const result = [];
    hash.set(obj, result);
    obj.forEach((item, index) => {
      result[index] = deepClone(item, hash);
    });
    return result;
  }

  // 处理普通对象
  const result = {};
  hash.set(obj, result);
  Object.keys(obj).forEach(key => {
    result[key] = deepClone(obj[key], hash);
  });
  return result;
}
