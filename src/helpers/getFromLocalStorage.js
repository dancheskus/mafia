export default item => {
  try {
    return JSON.parse(localStorage[item]);
  } catch (e) {} // eslint-disable-line no-empty
};
