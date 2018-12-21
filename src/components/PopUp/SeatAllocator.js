import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { connect } from 'react-redux';

import { addToSelectedNumbers, clearSelectedNumbers, changeGameState } from '../../redux/actions/gameActions';
import colors from '../../colors';
import PopUpButton from './style/PopUpButton';

const BigCircle = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  font-weight: 600;
  text-transform: uppercase;
  ${props =>
    props.number
      ? ` font-size: 9rem; color: ${colors.SeatAllocator.popupText}; background: white; `
      : `font-size: 2.3rem; color: white; background: ${colors.SeatAllocator.popupCircleBackground}; `}
`;

class SeatAllocator extends Component {
  state = { randomNumber: null };

  seats = _.shuffle(_.range(0, 10));

  stopInterval = () => {
    clearInterval(this.interval);
    this.interval = false;
    const randomNumber = this.seats.pop();
    this.setState({ randomNumber: randomNumber + 1 });
    this.props.addToSelectedNumbers(randomNumber);
  };

  buttonClicked = () => this.props.changeGameState({ phase: 'RoleDealing' }) && this.props.clearSelectedNumbers();

  randomClicked = () => {
    if (!this.seats.length || this.interval) return;
    let i = 0;
    this.interval = setInterval(() => {
      this.setState({ randomNumber: _.random(1, 10) });
      ++i === 20 && this.stopInterval();
    }, 40);
  };

  render = () => {
    return (
      <>
        <BigCircle
          className="d-flex justify-content-center align-items-center"
          onClick={this.randomClicked}
          number={this.state.randomNumber}
        >
          {this.state.randomNumber ? this.state.randomNumber : 'нажми'}
        </BigCircle>
        <PopUpButton color={this.props.game.gameState.phase} onClick={this.buttonClicked}>
          {this.seats.length ? 'пропустить' : 'играть'}
        </PopUpButton>
      </>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeatAllocator);
