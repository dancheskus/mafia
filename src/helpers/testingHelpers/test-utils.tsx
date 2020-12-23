import { render as rtlRender, screen as rtlScreen } from '@testing-library/react';
import { Provider } from 'react-redux';
import user from '@testing-library/user-event';
import { castArray } from 'lodash';

import { store } from 'redux/reduxStore';

const getRenderer = <T extends (...args: any[]) => JSX.Element>(Component: T, props: Parameters<T>[0] = {}) => (
  overrideProps?: Partial<Parameters<T>[0]>,
) => {
  const RenderComponent = ({ overrideProps }: { overrideProps: Partial<Parameters<T>>[0] }) => (
    <Provider store={store}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} {...overrideProps} />
    </Provider>
  );

  const helpers = rtlRender(<RenderComponent overrideProps={overrideProps} />);

  return {
    ...helpers,
    rerender: (rerenderOverrideProps: Partial<Parameters<T>[0]>) =>
      helpers.rerender(<RenderComponent overrideProps={rerenderOverrideProps} />),
  };
};

const clickButton = (name: RegExp | RegExp[]) => {
  castArray(name).forEach(name => user.click(rtlScreen.getByRole('button', { name })));
};
const clickByTestId = (testId: RegExp) => user.click(rtlScreen.getByTestId(testId));
const clickByText = (text: RegExp) => user.click(rtlScreen.getByText(text));

// re-export everything
export * from '@testing-library/react';

export { user, getRenderer, clickButton, clickByTestId, clickByText };
