import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  addToSelectedNumbers,
  clearSelectedNumbers,
  changeGameState,
  lightModeOn,
} from '../../redux/actions/gameActions';
import colors from '../../colors';
import PopUpButton from './style/PopUpButton';
import {
  EyeIcon,
  DonRingIcon,
  SherifOkIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  RandomCubeIcon,
  ListIcon,
} from '../../img/svgIcons';

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

class SeatAllocator extends Component {
  state = { randomNumber: null, randomModeSelected: true, manualModeSelected: false };

  seats = _.shuffle(_.range(1, 11));

  stopInterval = () => {
    clearInterval(this.interval);
    const randomNumber = this.seats.pop();
    this.setState({ randomNumber });
    this.props.addToSelectedNumbers(randomNumber);
  };

  buttonClicked = () => this.props.lightModeOn();

  randomClicked = () => {
    if (!this.seats.length) return;
    let i = 0;
    this.interval = setInterval(() => {
      this.setState({ randomNumber: _.random(1, 10) });
      ++i === 20 && this.stopInterval();
    }, 40);
  };

  render = () => {
    const lightMode = this.props.game.lightMode;
    return (
      <Fragment>
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
      </Fragment>
    );
  };
}

const mapStateToProps = state => ({
  game: state.game,
});

const mapDispatchToProps = dispatch => ({
  addToSelectedNumbers: playerNumber => dispatch(addToSelectedNumbers(playerNumber)),
  clearSelectedNumbers: () => dispatch(clearSelectedNumbers()),
  changeGameState: payload => dispatch(changeGameState(payload)),
  lightModeOn: () => dispatch(lightModeOn()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeatAllocator);
