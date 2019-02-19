import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import colors from 'colors.js';
import { PopUpButton } from '../styled-components';
import RandomMode from './RandomMode';
import ManualMode from './ManualMode';
import { RandomCubeIcon, ListIcon } from 'icons/svgIcons';
import { clearSelectedNumbers, lightModeOff, numbersPanelNotClickable } from 'redux/actions/gameActions';

const SvgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40%;
  flex-grow: 3;

  div:not(:last-child) {
    border-bottom: 2px solid ${colors.RoleDealing.dealingMode};
  }

  path {
    fill: ${props => (props.selected ? colors.RoleDealing.dealingModeSelected : colors.RoleDealing.dealingMode)};
    transition: fill 0.3s;
  }
  div:hover path,
  .selected path {
    fill: ${colors.RoleDealing.dealingModeSelected};
  }
`;

class RoleDealing extends Component {
  state = { randomModeSelected: true, manualModeSelected: false, modeApproved: false };

  componentDidMount = () => {
    this.props.clearSelectedNumbers();
    this.props.lightModeOff();
    this.props.numbersPanelNotClickable();
  };

  resetMode = () => this.setState({ modeApproved: false });

  buttonClicked = () => this.setState({ modeApproved: true });

  render = () => {
    const lightMode = this.props.game.lightMode;
    return (
      <>
        {!this.state.modeApproved ? (
          <>
            <SvgWrapper>
              <div
                className="flex-grow-1 d-flex align-items-center justify-content-center"
                onClick={() => this.setState({ randomModeSelected: true, manualModeSelected: false })}
              >
                <RandomCubeIcon className={this.state.randomModeSelected ? 'selected' : null} size={'100px'} />
              </div>
              <div
                className="flex-grow-1 d-flex align-items-center justify-content-center"
                onClick={() => this.setState({ manualModeSelected: true, randomModeSelected: false })}
              >
                <ListIcon className={this.state.manualModeSelected ? 'selected' : null} size={'100px'} />
              </div>
            </SvgWrapper>
            <div className="flex-grow-1 d-flex align-items-center">
              <PopUpButton color={this.props.game.gameState.phase} light={lightMode} onClick={this.buttonClicked}>
                {this.state.randomModeSelected ? 'автоматически' : 'вручную'}
              </PopUpButton>
            </div>
          </>
        ) : this.state.randomModeSelected ? (
          <RandomMode resetMode={this.resetMode} />
        ) : (
          <ManualMode resetMode={this.resetMode} />
        )}
      </>
    );
  };
}

export default connect(
  ({ game }) => ({ game }),
  { clearSelectedNumbers, lightModeOff, numbersPanelNotClickable }
)(RoleDealing);
