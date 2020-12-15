import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import user from '@testing-library/user-event';

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

// re-export everything
export * from '@testing-library/react';

export { user, getRenderer };
