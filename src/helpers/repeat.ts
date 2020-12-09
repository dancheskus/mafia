export default (callback: (i: number) => void, amount: number) => {
  for (let i = 0; i < amount; i++) {
    callback(i);
  }
};
