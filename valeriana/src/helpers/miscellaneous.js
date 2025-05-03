export function safeEvery(array, callback) {
  return array.length > 0 && array.every(callback);
}

export const filterExcludedItems = (list, excludedItems) => {
  return list.filter(item => !excludedItems.includes(item));
};

export const normalizeText = (text) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
 }