import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import StyledNavMenu from './style';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import { resetGameReducer } from 'redux/actions/gameActions';

const MenuItems = styled.div`
  opacity: ${props => (props.hide ? 0 : 1)};
`;

const AppSettings = styled.div`
  transition: opacity 0.5s;
  opacity: ${props => (props.hide ? 0 : 1)};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 70%;
  background: white;
  z-index: 180;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;

  @media (max-width: 750px) {
    width: 80%;
  }
`;

class NavMenu extends Component {
  state = { checked: false, settingsPage: true };

  render = () => (
    <StyledNavMenu>
      <input
        type="checkbox"
        onChange={() => this.setState({ checked: !this.state.checked })}
        checked
        // checked={this.state.checked}
        className="navi_check"
        id="navi-toggle"
      />

      <label htmlFor="navi-toggle" className="navi_button">
        <span className="navi_icon">&nbsp;</span>
      </label>

      <div className="navi-background" />

      <AppSettings hide={!this.state.settingsPage}>123</AppSettings>
      <MenuItems hide={this.state.settingsPage} className="navi_nav">
        <ul className="navi_list">
          <li onClick={() => this.setState({ settingsPage: true })} className="navi_item">
            <div className="navi_link">Настройки</div>
          </li>

          <li className="navi_item">
            <div
              onClick={() => {
                localStorage.clear();
                this.props.resetGameReducer();
                this.props.resetPlayersReducer();
                this.setState({ checked: false });
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
}

export default connect(
  ({ game }) => ({ game }),
  { resetPlayersReducer, resetGameReducer }
)(NavMenu);
