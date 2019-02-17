import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Switch from 'react-ios-switch';

import StyledNavMenu from './style';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import { resetGameReducer } from 'redux/actions/gameActions';
import { NextIcon } from './../../icons/svgIcons';
import {
  switchAppMusic,
  switchTimerSounds,
  switchMafiaTimer,
  switchMultiplePlayerRemove,
  switchSeatAllocator,
} from 'redux/actions/settingsActions';

const MenuItems = styled.div`
  opacity: ${props => (props.hide ? 0 : 1)};
`;

const AppSettings = styled.div`
  ${props =>
    props.hide
      ? `
  left: -2000px;
  opacity: 0;
  z-index: 180;
`
      : `
  left: 50%;
  opacity: 1;
  z-index: 400;
`}

  transition: opacity 0.5s;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 70%;
  background: rgb(145, 178, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  border-radius: 30px;
  padding: 30px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media (max-width: 750px) {
    width: 80%;
  }
`;

const SettingsLine = styled.div`
  border-bottom: 1px solid rgb(122, 156, 236);
  width: 100%;
  padding: 15px 0 15px 0;
  color: white;
  font-weight: 100;
  display: flex;
  align-items: center;
  text-align: left;

  span {
    width: 90%;
  }
`;

const BackButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgb(122, 156, 236);
  display: flex;
  flex-direction: center;
  justify-content: center;
  padding: 10px;
  transform: rotate(180deg);
  align-self: flex-start;
`;

class NavMenu extends Component {
  state = { checked: false, settingsPage: false };

  render = () => {
    const onColor = 'rgb(122, 156, 236)';

    return (
      <StyledNavMenu>
        <input
          type="checkbox"
          onChange={() => this.setState({ checked: !this.state.checked, settingsPage: false })}
          // checked
          checked={this.state.checked}
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
          <SettingsLine>
            <span>Музыка</span>{' '}
            <Switch
              onColor={onColor}
              checked={this.props.settings.appMusic}
              onChange={() => this.props.switchAppMusic()}
            />
          </SettingsLine>
          <SettingsLine>
            <span>Звуки таймера (15/5 сек)</span>
            <Switch
              onColor={onColor}
              checked={this.props.settings.timerSounds}
              onChange={() => this.props.switchTimerSounds()}
            />
          </SettingsLine>
          <SettingsLine>
            <span>Таймер на договорку (1 мин)</span>
            <Switch
              onColor={onColor}
              checked={this.props.settings.mafiaTimer}
              onChange={() => this.props.switchMafiaTimer()}
            />
          </SettingsLine>
          <SettingsLine>
            <span>Предлагать выгнать всех после повторной переголосовки</span>
            <Switch
              onColor={onColor}
              checked={this.props.settings.multiplePlayerRemove}
              onChange={() => this.props.switchMultiplePlayerRemove()}
            />
          </SettingsLine>
          <SettingsLine>
            <span>Раздача номеров в начале игры</span>
            <Switch
              onColor={onColor}
              checked={this.props.settings.seatAllocator}
              onChange={() => this.props.switchSeatAllocator()}
            />
          </SettingsLine>
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
  {
    resetPlayersReducer,
    resetGameReducer,
    switchAppMusic,
    switchTimerSounds,
    switchMafiaTimer,
    switchMultiplePlayerRemove,
    switchSeatAllocator,
  }
)(NavMenu);
