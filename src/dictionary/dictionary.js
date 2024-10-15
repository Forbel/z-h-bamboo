import { isObject, isArray } from "../utils/judgment";

export class Dictionary {
  #valueMap;
  #linkMap = new Map();

  constructor (obj) {
    this.setValueMap(obj);
  }

  getVal (key) {
    return this.#valueMap.get(key);
  }
  values () {
    return this.#valueMap.values();
  }
  keys () {
    return this.#valueMap.keys();
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
  setValueMap (obj) {
    this.#valueMap = Dictionary.toMap(obj);
  }
  [Symbol.iterator]() {
    return this.#valueMap[Symbol.iterator]();
  }

  /**
   * add linkMap, the key of linkMap must be the value of #valueMap
   * when dictionary is an array, it will convert array to a dictionary by the order of #valueMap
   * when dictionary is an object, it will convert object to a dictionary directly
   * @param {any} linkName
   * @param {Array, Object} dictionary
   */
  addLinkMap (linkName, dictionary) {
    if (isArray(dictionary)) {
      this.#linkMap.set(linkName, new Dictionary(this.convertLinkMap(dictionary)))
    } else if (isObject(dictionary)) {
      this.#linkMap.set(linkName, new Dictionary(dictionary))
    } else {
      throw new Error('linkMap must be an array or an object')
    }
  }
  convertLinkMap (dictArr) {
    const result = {}
    this.values().forEach((key, index) => {
      result[key] = dictArr[index]
    })
    return result
  }
  linkDict (linkName) {
    if (!this.#linkMap.has(linkName)) {
      throw new Error('linkMap has no key:', linkName)
    }
    return this.#linkMap.get(linkName)
  }

  static toMap (obj) {
    if (obj instanceof Map) return obj;

    return new Map(Object.entries(obj));
  }

  get value () {
    return Object.fromEntries(this.#valueMap);
  }
}
