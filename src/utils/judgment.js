export const isObject = value => typeof value === 'object' && value !== null;

export const isArray = Array.isArray;

export const isMap = value => value instanceof Map;