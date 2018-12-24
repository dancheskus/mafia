import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import PopUpButton from '../style/PopUpButton';
import HandsButton from './style/HandsButton';
import Circle from './style/Circle';
import BlockOfHands from './style/BlockOfHands';
import { clearSelectedNumbers, addToSelectedNumbers } from '../../../redux/actions/gameActions';
import Timer from '../../Timer';

class Voting extends Component {
  initialState = {
    handsAmount: Array(this.props.game.selectedNumbers.length).fill(0),
    handsLeft: 10,
    currentPlayer: 0,
    timer: false,
    carCrash: 0,
  };
  state = { ...this.initialState };

  handClicked = num => {
    if (this.state.currentPlayer === this.props.game.selectedNumbers.length - 1) return;

    const { currentPlayer, handsAmount } = this.state;
    const arr = [...handsAmount];
    arr[currentPlayer] = handsAmount[currentPlayer] === num ? null : num;
    this.setState({ handsAmount: arr });
  };

  votingFinishedClicked = () => {
    const { handsAmount } = this.state;
    let largestNumber = Math.max(...handsAmount);
    const newVotingList = [];
    handsAmount.filter((el, i) => el === largestNumber && newVotingList.push(this.props.game.selectedNumbers[i]));

    if (newVotingList.length > 1) {
      this.props.clearSelectedNumbers();
      newVotingList.map(num => this.props.addToSelectedNumbers(num));
      this.setState({ ...this.initialState, timer: true });

      if (this.state.carCrash) this.setState({ carCrash: 2 });
    }

    this.state.timer && this.setState({ ...this.initialState, carCrash: 1 });
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
    const avaliableHandsAmount = this.state.handsAmount[this.props.game.selectedNumbers.length - 1] - deadPlayers;
    const lastPlayer = this.state.currentPlayer === this.props.game.selectedNumbers.length - 1;

    return (
      <>
        <Circle>{this.state.carCrash === 2 ? 'ВСЕ' : this.props.game.selectedNumbers[this.state.currentPlayer]}</Circle>

        {this.state.timer && this.state.carCrash !== 2 ? (
          <Timer time={30} key={this.state.currentPlayer} />
        ) : (
          <BlockOfHands className="col-10 col-md-8 col-lg-6">
            {_.range(1, 11).map(num => (
              <HandsButton
                disabled={lastPlayer ? num !== avaliableHandsAmount : num > this.state.handsLeft - deadPlayers}
                selected={
                  lastPlayer ? num === avaliableHandsAmount : this.state.handsAmount[this.state.currentPlayer] === num
                }
                onClick={() => this.handClicked(num)}
                key={num}
              >
                <div className="number">{num}</div>
              </HandsButton>
            ))}
          </BlockOfHands>
        )}

        <PopUpButton color="Voting" onClick={lastPlayer ? this.votingFinishedClicked : this.nextButtonClicked}>
          {lastPlayer ? 'Завершить' : 'Далее'}
        </PopUpButton>
      </>
    );
  };
}

const mapStateToProps = ({ game, players }) => ({ game, players });

const mapDispatchToProps = dispatch => ({
  clearSelectedNumbers: () => dispatch(clearSelectedNumbers()),
  addToSelectedNumbers: playerNumber => dispatch(addToSelectedNumbers(playerNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Voting);
