import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyledNavMenu, MenuItems } from './style';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import { resetGameReducer } from 'redux/actions/gameActions';
import Settings from './Settings';

class NavMenu extends Component {
  state = { checked: false, settingsPage: false };

  render = () => {
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

        <Settings hide={!this.state.settingsPage} onClose={() => this.setState({ settingsPage: false })} />

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
  };
}

export default connect(
  ({ game, settings }) => ({ game, settings }),
  { resetPlayersReducer, resetGameReducer }
)(NavMenu);
