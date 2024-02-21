export const getLs = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
