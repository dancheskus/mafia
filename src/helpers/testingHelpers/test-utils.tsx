import { render as rtlRender, screen as rtlScreen } from '@testing-library/react';
import { Provider } from 'react-redux';
import user from '@testing-library/user-event';
import { castArray } from 'lodash';
import { I18nextProvider } from 'react-i18next';

import { store } from 'redux/reduxStore';

import i18n from '../../i18n';

i18n.changeLanguage('ru');

const getRenderer = <T extends (...args: any[]) => JSX.Element | null>(Component: T, props: Parameters<T>[0] = {}) => (
  overrideProps?: Partial<Parameters<T>[0]>,
) => {
  const RenderComponent = ({ overrideProps }: { overrideProps: Partial<Parameters<T>>[0] }) => (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} {...overrideProps} />
      </I18nextProvider>
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

const addPortal = () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'portal');
  document.body.appendChild(modalRoot);
};

// re-export everything
export * from '@testing-library/react';

export { user, getRenderer, clickButton, clickByTestId, clickByText, addPortal };
