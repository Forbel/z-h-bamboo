import { isObject, isArray, isMap, deepClone } from "../utils";

/**
 * the origin data only accept below types:
 * 1. Object: available for string key
 * 2. Array: available for all cases
 * 3. Map: available for all cases
 */
export class Dictionary {
  #raw;
  #valueMap;
  #linkMap = new Map();

  constructor (data) {
    this.#raw = data;
    this.#setValueMap(data);
  }

  getVal (key) {
    return this.#valueMap.get(key);
  }
  values () {
    return Array.from(this.#valueMap.values());
  }
  keys () {
    return Array.from(this.#valueMap.keys());
  }
  getKey (value) {
    for (let [key, val] of this.#valueMap.entries()) {
      if (val === value) return key;
    }
  }
  hasValue(value) {
    for (let val of this.values()) {
      if (val === value) return true;
    }
    return false;
  }
  getRaw () {
    return deepClone(this.#raw);
  }

  #setValueMap (data) {
    if (isMap(data)) {
      this.#valueMap = data;
    } else if (isArray(data)) {
      this.#valueMap = new Map(data);
    } else if (isObject(data)) {
      this.#valueMap = Dictionary.toMap(data);
    } else {
      throw new Error('type of data is invalid');
    }
  }

  /**
   * add linkMap, the key of linkMap must be value of #valueMap
   * @param {any} linkName
   * @param {Array} dictionary
   */
  addLink (linkName, dictionary, convertType = false) {
    const data = convertType ? this[convertType]?.(dictionary) : dictionary
    this.#linkMap.set(linkName, new Dictionary(data))
  }
  getLink (linkName) {
    if (!this.#linkMap.has(linkName)) {
      throw new Error('linkMap has no key:', linkName)
    }
    return this.#linkMap.get(linkName)
  }
  getLinkVal (linkName, value) {
    const linkDict = this.linkOf(linkName)
    return linkDict.getVal(value);
  }
  byDefaultSequence (dictArr) {
    return this.values().map((item, index) => [item, dictArr[index]])
  }

  static toMap (data) {
    if (isMap(data)) return data;

    return new Map(Object.entries(data));
  }
  [Symbol.iterator]() {
    return this.#valueMap[Symbol.iterator]();
  }
}
