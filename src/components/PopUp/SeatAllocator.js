import React, { Component } from 'react';
import styled from 'styled-components';
import { shuffle, range, random } from 'lodash';
import { connect } from 'react-redux';

import { addToSelectedNumbers, clearSelectedNumbers, changeGameState } from 'redux/actions/gameActions';
import colors from 'colors.js';
import { PopUpButton } from './styled-components';

const BigCircle = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  font-weight: 600;
  text-transform: uppercase;
  ${({ enabled }) => enabled && 'cursor: pointer'};

  ${props =>
    props.number
      ? ` font-size: 9rem; color: ${colors.SeatAllocator.popupText}; background: white; `
      : `font-size: 2.3rem; color: white; background: ${colors.SeatAllocator.popupCircleBackground}; `}
`;

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

  render = () => (
    <>
      <BigCircle
        className='d-flex justify-content-center align-items-center seat-allocator-big-circle'
        onClick={this.randomClicked}
        number={this.state.randomNumber}
        enabled={this.seats.length}
      >
        {this.state.randomNumber ? this.state.randomNumber : 'нажми'}
      </BigCircle>
      <PopUpButton
        color={this.props.game.gameState.phase}
        onClick={this.buttonClicked}
        className='seat-allocator-popup-button'
      >
        {this.seats.length ? 'пропустить' : 'играть'}
      </PopUpButton>
    </>
  );
}

export default connect(({ game }) => ({ game }), { addToSelectedNumbers, clearSelectedNumbers, changeGameState })(
  SeatAllocator
);
