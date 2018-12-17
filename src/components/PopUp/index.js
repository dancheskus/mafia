import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import colors from '../../colors';
import { MaximizeIcon, MinimizeIcon } from '../../img/svgIcons';

const StyledPopUp = styled.div`
  background: ${props =>
    props.light ? colors[props.color].popupBackgroundLight : colors[props.color].popupBackground};

  border-radius: 10px;
  box-shadow: 0px 9px 24px -2px rgba(0, 0, 0, 0.52);
  user-select: none;
  position: relative;
  height: 100%;

  ${props =>
    props.minimized
      ? `
        width: 100px; height: 100px;
        div:not(.minimize-button),
        h1,
        button {
          display: none;
        }
      `
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
  transition: filter 0.3s;

  &:hover {
    filter: brightness(110%);
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
        {phase !== 'SeatAllocator' && phase !== 'RoleDealing' && (
          <MinimizeButton className="minimize-button" color={phase} light={lightMode} onClick={this.minimizeClicked}>
            {this.state.minimized ? (
              <MaximizeIcon className="resize-button" size={'50%'} />
            ) : (
              <MinimizeIcon className="resize-button" size={'50%'} />
            )}
          </MinimizeButton>
        )}

        <this.props.popupChild />
      </StyledPopUp>
    );
  };
}

const mapStateToProps = ({ game }) => ({ game });
export default connect(mapStateToProps)(PopUp);
