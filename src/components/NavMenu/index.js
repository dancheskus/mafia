import React from 'react';
import NavMenu from './style';

export default () => (
  <NavMenu>
    <input type="checkbox" className="navi_check" id="navi-toggle" />
    <label htmlFor="navi-toggle" className="navi_button">
      <span className="navi_icon">&nbsp;</span>
    </label>
    <div className="navi-background" />
    <div className="navi_nav">
      <ul className="navi_list">
        <li className="navi_item">
          <a href="/" className="navi_link">
            Настройки
          </a>
        </li>

        <li className="navi_item">
          <a href="/" className="navi_link">
            Плеер
          </a>
        </li>

        <li className="navi_item">
          <a
            onClick={() => {
              console.log(4);
            }}
            href="/"
            className="navi_link"
          >
            Новая игра
          </a>
        </li>

        <li className="navi_item">
          <a href="/" className="navi_link">
            Выход
          </a>
        </li>
      </ul>
    </div>
  </NavMenu>
);
