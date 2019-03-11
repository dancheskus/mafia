import React, { useState } from 'react';
import { connect } from 'react-redux';

import { StyledNavMenu, MenuItems } from './style';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import { resetGameReducer } from 'redux/actions/gameActions';
import Settings from './Settings';

const NavMenu = props => {
  const [isChecked, setIsChecked] = useState(false);
  const [isSettingsPage, setIsSettingsPage] = useState(false);

  const { tutorialEnabled } = props.settings;

  return (
    <StyledNavMenu tutorialEnabled={tutorialEnabled}>
      <input
        type="checkbox"
        onChange={() => {
          setIsChecked(!isChecked);
          setIsSettingsPage(false);
        }}
        // checked
        checked={isChecked}
        className="navi_check"
        id="navi-toggle"
      />

      <label htmlFor="navi-toggle" className="navi_button">
        <span className="navi_icon">&nbsp;</span>
      </label>

      <div className="navi-background" />

      <Settings hide={!isSettingsPage} onClose={() => setIsSettingsPage(false)} />

      <MenuItems hide={isSettingsPage} className="navi_nav">
        <ul className="navi_list">
          <li onClick={() => setIsSettingsPage(true)} className="navi_item">
            <div className="navi_link">Настройки</div>
          </li>

          <li className="navi_item">
            <div
              onClick={() => {
                localStorage.clear();
                props.resetGameReducer();
                props.resetPlayersReducer();
                setIsChecked(false);
              }}
              className="navi_link"
            >
              Новая игра
            </div>
          </li>
        </ul>
      </MenuItems>

      <div className="menu-footer">
        Проект{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/dancheskus">
          Даниэля Шлейфмана
        </a>
        . 2018-2019г.
      </div>
    </StyledNavMenu>
  );
};

export default connect(
  ({ game, settings }) => ({ game, settings }),
  { resetPlayersReducer, resetGameReducer }
)(NavMenu);
