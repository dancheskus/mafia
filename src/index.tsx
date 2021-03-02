import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';

import './i18n';

import { saveState } from 'redux/localStorage';
import App from 'components/App';
import { store } from 'redux/reduxStore';

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
