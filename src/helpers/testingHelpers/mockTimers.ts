export const mockSetIntervalOnce = () =>
  // @ts-expect-error
  jest.spyOn(window, 'setInterval').mockImplementationOnce(callback => callback());

// @ts-expect-error
export const mockSetInterval = () => jest.spyOn(window, 'setInterval').mockImplementation(callback => callback());
