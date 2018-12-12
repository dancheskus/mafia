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

class SeatAllocator extends Component {
  state = { randomNumber: null };

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
        <PopUpButton color={this.props.game.gameState.phase} light={lightMode} onClick={this.buttonClicked}>
          {this.seats.length ? 'пропустить' : 'играть'}
        </PopUpButton>
        <EyeIcon size={'10%'} />
        <DonRingIcon size={'10%'} />
        <SherifOkIcon size={'10%'} />
        <ThumbUpIcon size={'10%'} />
        <ThumbDownIcon size={'10%'} />
        <RandomCubeIcon size={'10%'} />
        <ListIcon size={'10%'} />
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
