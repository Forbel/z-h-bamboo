import { isObject, isArray } from "../utils/judgment";

class Dictionary {
  #valueMap;
  #linkMap = new Map();

  constructor (obj) {
    this.setValueMap(obj);
  }

  valueOf (key) {
    return this.#valueMap.get(key);
  }
  values () {
    return Array.from(this.#valueMap.values());
  }
  keys () {
    return Array.from(this.#valueMap.keys());
  }
  keyOf (value) {
    for (let [key, val] of this.#valueMap.entries()) {
      if (val === value) return key;
    }
  }
  hasValue (value) {
    return [...this.#valueMap.values()].includes(value);
  }
  setValueMap (obj) {
    this.#valueMap = Dictionary.toMap(obj);
  }

  /**
   * add linkMap, the key of linkMap must be the value of #valueMap
   * when dictionary is an array, it will convert array to a dictionary by the order of #valueMap
   * when dictionary is an object, it will convert object to a dictionary directly
   * @param {any} mapName 
   * @param {Array, Object} dictionary 
   */
  addLinkMap (mapName, dictionary) {
    if (isArray(dictionary)) {
      this.#linkMap.set(mapName, new Dictionary(this.convertLinkMap(dictionary)))
    } else if (isObject(dictionary)) {
      this.#linkMap.set(mapName, new Dictionary(dictionary))
    }
    console.error('linkMap must be an array or an object')
  }
  convertLinkMap (dictArr) {
    const result = {}
    this.values().forEach((key, index) => {
      result[key] = dictArr[index]
    })
    return result
  }
  valueOfLink (linkKey, key) {
    const linkDict = this.#linkMap.get(linkKey)
    return linkDict.valueOf(key)
  }

  

  static toMap (obj) {
    if (obj instanceof Map) return obj;

    return new Map(Object.entries(obj));
  }

  get value () {
    return Object.fromEntries(this.#valueMap);
  }
}