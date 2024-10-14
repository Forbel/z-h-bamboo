import Dictionary from './dictionary';

export class DictContainer {
  #map = new Map();

  getDict (key) {
    if (!this.#map.has(key)) {
      return console.error(`字典${key}不存在`)
    }

    return this.#map.get(key);
  }
  addDict (key, valueEnum) {
    if (this.#map.has(key)) {
      return console.error(`字典${key}已存在`);
    }

    this.#map.set(key, new Dictionary(valueEnum));
  }
}





export const getDict = (key) => {
  return dictMap.getDict(key);
};
