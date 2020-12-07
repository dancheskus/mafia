export default (callback: (i: number) => void, amount: number) => {
  for (let i = 1; i <= amount; i++) {
    callback(i);
  }
};
