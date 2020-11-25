export default (item: string) => {
  try {
    return JSON.parse(localStorage[item]);
  } catch (e) {} // eslint-disable-line no-empty
};
