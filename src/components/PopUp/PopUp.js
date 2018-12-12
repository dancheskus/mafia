import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import colors from '../../colors';

const StyledPopUp = styled.div`
  background: ${props =>
    props.light ? colors[props.color].popupBackgroundLight : colors[props.color].popupBackground};

  border-radius: 10px;
  box-shadow: 0px 9px 24px -2px rgba(0, 0, 0, 0.52);
  user-select: none;
  position: relative;

  ${props =>
    props.minimized
      ? ` width: 100px; height: 100px; `
      : `
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      `};
`;

const MinimizeButton = styled.div`
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => (props.light ? colors[props.color].popupButtonLight : colors[props.color].popupButton)};
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.3);

    &::after {
      width: 7px;
      height: 7px;
    }
  }

  &::after {
    transition: all 0.2s;
    content: '';
    width: 0;
    height: 0;
    border-radius: 50%;
    background: ${props =>
      props.light ? colors[props.color].popupBackgroundLight : colors[props.color].popupBackground};
  }
`;

class PopUp extends Component {
  state = { minimized: false };

  minimizeClicked = () => this.setState({ minimized: !this.state.minimized });

  render = () => {
    const phase = this.props.game.gameState.phase;
    const lightMode = this.props.game.lightMode;
    return (
      <StyledPopUp color={phase} light={lightMode} minimized={this.state.minimized}>
        <MinimizeButton color={phase} light={lightMode} onClick={this.minimizeClicked} />
        {!this.state.minimized ? this.props.children : null}
      </StyledPopUp>
    );
  };
}

const mapStateToProps = state => ({ game: state.game });
export default connect(mapStateToProps)(PopUp);
