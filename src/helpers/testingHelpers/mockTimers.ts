export const mockSetIntervalOnce = () =>
  jest.spyOn(window, 'setInterval').mockImplementationOnce(callback => callback());
export const mockSetInterval = () => jest.spyOn(window, 'setInterval').mockImplementation(callback => callback());
