import React, { Component } from 'react';
import { shuffle, range, random } from 'lodash';
import { connect } from 'react-redux';

import { addToSelectedNumbers, clearSelectedNumbers, changeGameState } from 'redux/actions/gameActions';

import { PopUpButton } from '../styled-components';
import { BigCircle } from './style';

class SeatAllocator extends Component {
  state = { randomNumber: null };

  componentDidMount = () => {
    this.props.clearSelectedNumbers();
  };

  seats = shuffle(range(0, 10));

  componentWillUnmount = () => {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
  };

  stopInterval = () => {
    clearInterval(this.interval);
    this.interval = false;
    const randomNumber = this.seats.pop();
    this.setState({ randomNumber: randomNumber + 1 });
    this.props.addToSelectedNumbers(randomNumber);
    this.timeout = setTimeout(() => {
      this.setState({ randomNumber: this.seats.length ? null : this.state.randomNumber });
    }, 1000);
  };

  buttonClicked = () => {
    this.props.changeGameState({ phase: 'RoleDealing' }) && this.props.clearSelectedNumbers();
  };

  randomClicked = () => {
    if (!this.seats.length || this.interval) return;
    clearTimeout(this.timeout);

    let i = 0;
    this.interval = setInterval(() => {
      this.setState({ randomNumber: random(1, 10) });
      ++i === 20 && this.stopInterval();
    }, 40);
  };

  render = () => {
    const { randomClicked, seats, buttonClicked } = this;
    const { randomNumber } = this.state;
    const { phase } = this.props.game.gameState;

    return (
      <>
        <BigCircle
          className='d-flex justify-content-center align-items-center seat-allocator-big-circle'
          onClick={randomClicked}
          number={randomNumber}
          enabled={seats.length}
        >
          {randomNumber || 'нажми'}
        </BigCircle>

        <PopUpButton color={phase} onClick={buttonClicked} className='seat-allocator-popup-button'>
          {seats.length ? 'пропустить' : 'играть'}
        </PopUpButton>
      </>
    );
  };
}

export default connect(({ game }) => ({ game }), { addToSelectedNumbers, clearSelectedNumbers, changeGameState })(
  SeatAllocator
);
