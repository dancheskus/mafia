import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import colors from 'colors.js';
import { MaximizeIcon, MinimizeIcon } from 'icons/svgIcons';

const StyledPopUp = styled.div`
  background: ${props =>
    props.light ? colors[props.color].popupBackgroundLight : colors[props.color].popupBackground};

  border-radius: 10px;
  box-shadow: 3px 10px 9px -4px rgba(0, 0, 0, 0.31);
  position: absolute;
  height: calc(100% - 40px);
  width: calc(100% - 40px);
  bottom: 20px;
  left: 20px;
  z-index: 111;
  transition: height 0.3s, width 0.3s;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  div:not(.minimize-button),
  h1,
  button {
    opacity: 1;
    transition: opacity 0.2s, transform 0.3s;
  }

  ${props =>
    props.minimized &&
    `
        width: 100px; height: 100px;
        div:not(.minimize-button),
        h1,
        button {
          opacity:0;
    transform: translateX(-160%);
        }
      `};

  display: ${props => !props.opened && 'none'};
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
  transition: filter 0.3s;
  z-index: 222;

  :hover {
    filter: brightness(110%);
  }
`;

class PopUp extends Component {
  state = { minimized: false };

  minimizeClicked = () => {
    this.setState({ minimized: !this.state.minimized });
  };

  render = () => {
    const phase = this.props.game.gameState.phase;
    const lightMode = this.props.game.lightMode;
    return (
      <StyledPopUp opened={this.props.opened} color={phase} light={lightMode} minimized={this.state.minimized}>
        {phase !== 'SeatAllocator' && phase !== 'RoleDealing' && phase !== 'EndOfGame' && (
          <MinimizeButton className="minimize-button" color={phase} light={lightMode} onClick={this.minimizeClicked}>
            {this.state.minimized ? <MaximizeIcon size={'50%'} /> : <MinimizeIcon size={'50%'} />}
          </MinimizeButton>
        )}

        <this.props.popupChild />
      </StyledPopUp>
    );
  };
}

const mapStateToProps = ({ game }) => ({ game });
export default connect(mapStateToProps)(PopUp);
