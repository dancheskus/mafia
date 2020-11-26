import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';

import { saveState } from 'redux/localStorage';
import store from 'redux/reduxStore';
import App from 'components/App';

// ----------- Отключение pullToRefresh и scroll в моб. браузерах --------------------

const element: any = document.querySelector('#root');

let prevent = false;

element.addEventListener('touchstart', (e: any) => {
  if (e.touches.length !== 1) return;

  const scrollY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

  prevent = scrollY === 0;
});

element.addEventListener('touchmove', (e: any) => {
  if (prevent) {
    prevent = false;
    e.preventDefault();
  }
});

// ------------------------------------------------------------------------------------

store.subscribe(
  throttle(() => {
    const { settings, ...storeWithoutSettings } = store.getState();
    saveState(storeWithoutSettings);
  }, 1000),
);

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
