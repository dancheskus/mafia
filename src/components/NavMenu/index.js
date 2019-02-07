import React, { Component } from 'react';
import { connect } from 'react-redux';

import StyledNavMenu from './style';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import { resetGameReducer } from 'redux/actions/gameActions';

class NavMenu extends Component {
  state = { checked: false };

  render = () => (
    <StyledNavMenu>
      <input
        type="checkbox"
        onChange={() => this.setState({ checked: !this.state.checked })}
        // checked
        checked={this.state.checked}
        className="navi_check"
        id="navi-toggle"
      />
      <label htmlFor="navi-toggle" className="navi_button">
        <span className="navi_icon">&nbsp;</span>
      </label>
      <div className="navi-background" />
      <div className="navi_nav">
        <ul className="navi_list">
          <li className="navi_item">
            <div className="navi_link">Настройки</div>
          </li>

          <li className="navi_item">
            <div
              onClick={() => {
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
      </div>
    </StyledNavMenu>
  );
}

export default connect(
  ({ game }) => ({ game }),
  { resetPlayersReducer, resetGameReducer }
)(NavMenu);
