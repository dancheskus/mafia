import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyledNavMenu, AppSettings, BackButton, MenuItems } from './style';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import { resetGameReducer } from 'redux/actions/gameActions';
import { NextIcon } from './../../icons/svgIcons';
import SettingsItem from './SettingsItem';

class NavMenu extends Component {
  state = { checked: false, settingsPage: true };

  render = () => {
    return (
      <StyledNavMenu>
        <input
          type="checkbox"
          onChange={() => this.setState({ checked: !this.state.checked, settingsPage: false })}
          checked
          // checked={this.state.checked}
          className="navi_check"
          id="navi-toggle"
        />

        <label htmlFor="navi-toggle" className="navi_button">
          <span className="navi_icon">&nbsp;</span>
        </label>

        <div className="navi-background" />

        <AppSettings hide={!this.state.settingsPage}>
          <BackButton onClick={() => this.setState({ settingsPage: false })}>
            <NextIcon />
          </BackButton>
          <SettingsItem title="Раздача номеров в начале игры" type="seatAllocator" />
          <SettingsItem title="Музыка" type="appMusic" />
          <SettingsItem title="Звуки таймера (на 15/5 сек)" type="timerSounds" />
          <SettingsItem title="Таймер на договорку (1 мин)" type="mafiaTimer" />
          <SettingsItem title="Предлагать выгнать всех после повторной переголосовки" type="multiplePlayerRemove" />
        </AppSettings>

        <MenuItems hide={this.state.settingsPage} className="navi_nav">
          <ul className="navi_list">
            <li onClick={() => this.setState({ settingsPage: true })} className="navi_item">
              <div className="navi_link">Настройки</div>
            </li>

            <li className="navi_item">
              <div
                onClick={() => {
                  const appSettings = localStorage.settings;
                  localStorage.clear();
                  this.props.resetGameReducer();
                  this.props.resetPlayersReducer();
                  this.setState({ checked: false });
                  localStorage.setItem('settings', appSettings);
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
}

export default connect(
  ({ game, settings }) => ({ game, settings }),
  { resetPlayersReducer, resetGameReducer }
)(NavMenu);
