import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.scss';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import { saveState } from 'redux/localStorage';
import App from './components/App';

import configureStore from './redux/configureStore';

// ----------- Отключение pullToRefresh и scroll в моб. браузерах --------------------

const element = document.querySelector('#root');

let prevent = false;

element.addEventListener('touchstart', e => {
  if (e.touches.length !== 1) return;

  const scrollY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

  prevent = scrollY === 0;
});

element.addEventListener('touchmove', e => {
  if (prevent) {
    prevent = false;
    e.preventDefault();
  }
});

// ------------------------------------------------------------------------------------

const store = configureStore();

store.subscribe(
  throttle(() => {
    const { settings, ...storeWithoutSettings } = store.getState();
    saveState(storeWithoutSettings);
  }, 1000)
);

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
