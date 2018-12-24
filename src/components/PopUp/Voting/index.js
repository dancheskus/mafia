import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import PopUpButton from '../style/PopUpButton';
import HandsButton from './style/HandsButton';
import Circle from './style/Circle';
import BlockOfHands from './style/BlockOfHands';

class Voting extends Component {
  state = { handsAmount: Array(this.props.game.selectedNumbers.length).fill(0), handsLeft: 10, currentPlayer: 0 };

  handClicked = num => {
    const { currentPlayer, handsAmount } = this.state;
    const arr = [...handsAmount];
    arr[currentPlayer] = handsAmount[currentPlayer] === num ? null : num;
    this.setState({ handsAmount: arr });
  };

  nextButtonClicked = () => {
    const { currentPlayer, handsAmount, handsLeft } = this.state;
    if (currentPlayer < this.props.game.selectedNumbers.length - 1) {
      this.setState({
        currentPlayer: currentPlayer + 1,
        handsLeft: this.state.handsAmount.length >= 1 ? 10 - this.state.handsAmount.reduce((a, b) => a + b) : 10,
      });
    }

    if (this.props.game.selectedNumbers.length - 2 === currentPlayer) {
      const arr = [...handsAmount];
      arr[currentPlayer + 1] = handsLeft - this.state.handsAmount[currentPlayer];
      this.setState({ handsAmount: arr });
    }
  };

  render = () => {
    const deadPlayers = this.props.players.filter(player => !player.isAlive).length;

    return (
      <>
        <Circle>{this.props.game.selectedNumbers[this.state.currentPlayer]}</Circle>

        <BlockOfHands className="col-10 col-md-8 col-lg-6">
          {_.range(1, 11).map(num => (
            <HandsButton
              disabled={
                (this.state.currentPlayer === this.props.game.selectedNumbers.length - 1 &&
                  num !== this.state.handsAmount[this.props.game.selectedNumbers.length - 1] - deadPlayers) ||
                num > this.state.handsLeft - deadPlayers
              }
              selected={
                this.state.currentPlayer === this.props.game.selectedNumbers.length - 1
                  ? num === this.state.handsAmount[this.props.game.selectedNumbers.length - 1] - deadPlayers
                  : this.state.handsAmount[this.state.currentPlayer] === num
              }
              onClick={() => this.handClicked(num)}
              key={num}
            >
              <div className="number">{num}</div>
            </HandsButton>
          ))}
        </BlockOfHands>

        <PopUpButton color="Voting" onClick={this.nextButtonClicked}>
          {this.state.currentPlayer < this.props.game.selectedNumbers.length - 1 ? 'Далее' : 'Завершить'}
        </PopUpButton>
      </>
    );
  };
}

const mapStateToProps = ({ game, players }) => ({ game, players });

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Voting);
