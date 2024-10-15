import { Dictionary } from './dictionary.js';

export class DictContainer {
  #map = new Map();

  getDict (key) {
    if (!this.#map.has(key)) {
      throw new Error(`dictionary ${key} is not exist`)
    }

    return this.#map.get(key);
  }
  addDict (key, valueEnum) {
    if (this.#map.has(key)) {
      throw new Error(`dictionary ${key} is already exist`);
    }

    this.#map.set(key, new Dictionary(valueEnum));
  }
}

export const dictContainer = new DictContainer();