import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import PopUpButton from '../style/PopUpButton';
import VotingSingleElement from '../../common/styled-components/VotingSingleElement';
import Circle from './style/Circle';
import VotingBlock from '../../common/styled-components/VotingBlock';
import { clearSelectedNumbers, addToSelectedNumbers, changeGameState } from '../../../redux/actions/gameActions';
import { killPlayer } from '../../../redux/actions/playersActions';
import Timer from '../../Timer';
import CarCrashNotification from './CarCrashNotification';
import EndOfVotingNotification from './EndOfVotingNotification';
import TimerForPlayer from './TimerForPlayer';
import { ResultsLabel } from './style/Results';

class Voting extends Component {
  initialState = {
    handsAmount: Array(this.props.game.selectedNumbers.length).fill(0),
    handsLeft: 10,
    currentPlayer: 0,
    timer: false,
    carCrash: 0,
    carCrashLabel: false,
    endOfVoting: false,
    lastMinuteFor: [],
  };

  state = { ...this.initialState };

  componentWillMount = () => {
    if (this.props.game.gameState.dayNumber > 1 && this.props.game.selectedNumbers.length === 1) {
      this.votingFinishedClicked();
      this.props.killPlayer(this.props.game.selectedNumbers[0]);
    }
  };

  handClicked = num => {
    const { currentPlayer, handsAmount } = this.state;

    if (currentPlayer === this.props.game.selectedNumbers.length - 1) return;

    const arr = [...handsAmount];
    arr[currentPlayer] = handsAmount[currentPlayer] === num ? null : num;
    this.setState({ handsAmount: arr });
  };

  votingFinishedClicked = () => {
    if (this.state.lastMinuteFor.length > 0) return this.goToNight();

    const { handsAmount } = this.state;
    const largestNumber = Math.max(...handsAmount);
    const newVotingList = [];
    handsAmount.filter((el, i) => el === largestNumber && newVotingList.push(this.props.game.selectedNumbers[i]));

    if (newVotingList.length > 1 && this.state.carCrash !== 2) {
      this.props.clearSelectedNumbers();
      newVotingList.map(num => this.props.addToSelectedNumbers(num));
      this.setState({ ...this.initialState, timer: true });

      if (!this.state.carCrash) this.setState({ carCrashLabel: true });

      if (this.state.carCrash) this.setState({ carCrash: 2 });
    } else {
      this.setState({ endOfVoting: true });
      this.setState({ lastMinuteFor: this.state.lastMinuteFor.concat(newVotingList[0]) });
    }

    this.state.timer && this.setState({ ...this.initialState, carCrash: 1 });

    if (this.state.carCrash === 2) {
      const deadPlayers = this.props.players.filter(player => !player.isAlive).length;
      const avaliableHandsAmount = 10 - deadPlayers;

      this.setState({ endOfVoting: true });

      if (handsAmount[0] > avaliableHandsAmount / 2) {
        this.setState({ lastMinuteFor: this.state.lastMinuteFor.concat(this.props.game.selectedNumbers) });

        this.props.game.selectedNumbers.map(player => this.props.killPlayer(player));
      }
    }
  };

  nextButtonClicked = () => {
    const { currentPlayer, handsAmount, handsLeft } = this.state;
    const deadPlayers = this.props.players.filter(player => !player.isAlive).length;

    if (currentPlayer < this.props.game.selectedNumbers.length - 1) {
      const handsLeft = this.state.handsAmount.length >= 1 ? 10 - this.state.handsAmount.reduce((a, b) => a + b) : 10;

      if (handsLeft - deadPlayers === 0) return this.votingFinishedClicked();

      this.setState({
        currentPlayer: currentPlayer + 1,
        handsLeft,
      });
    }

    if (this.props.game.selectedNumbers.length - 2 === currentPlayer) {
      const deadPlayers = this.props.players.filter(player => !player.isAlive).length;
      const arr = [...handsAmount];
      arr[currentPlayer + 1] = handsLeft - this.state.handsAmount[currentPlayer] - deadPlayers;
      this.setState({ handsAmount: arr });
    }
  };

  okClicked = () => this.setState({ carCrashLabel: false, endOfVoting: false });

  goToNight = () => {
    this.props.clearSelectedNumbers();
    this.props.changeGameState({ phase: 'Night' });
  };

  render = () => {
    const deadPlayers = this.props.players.filter(player => !player.isAlive).length;
    const { carCrash, currentPlayer } = this.state;
    const { gameState, selectedNumbers } = this.props.game;
    const avaliableHandsAmount = this.state.handsAmount[selectedNumbers.length - 1];
    const lastPlayer = this.state.currentPlayer === selectedNumbers.length - 1;

    if (gameState.dayNumber === 1 && selectedNumbers.length === 1)
      return (
        <>
          <ResultsLabel className="h2">Голосование не проводится</ResultsLabel>

          <PopUpButton color="Voting" onClick={this.goToNight}>
            Ночь
          </PopUpButton>
        </>
      );

    if (this.state.carCrashLabel) return <CarCrashNotification okClicked={this.okClicked} />;

    if (this.state.endOfVoting)
      return (
        <EndOfVotingNotification
          okClicked={this.okClicked}
          goToNight={this.goToNight}
          lastMinuteFor={this.state.lastMinuteFor}
        />
      );

    if (this.state.lastMinuteFor.length > 0 || (gameState.dayNumber === 1 && selectedNumbers.length === 1))
      return (
        <TimerForPlayer
          state={{ ...this.state }}
          lastPlayer={lastPlayer}
          votingFinishedClicked={this.votingFinishedClicked}
          nextButtonClicked={this.nextButtonClicked}
        />
      );

    return (
      <>
        {carCrash === 1 && <ResultsLabel className="h2">Повторное голосование</ResultsLabel>}

        {carCrash === 2 && <ResultsLabel className="h2">Выгнать всех выставленных?</ResultsLabel>}

        {carCrash !== 2 && <Circle>{selectedNumbers[currentPlayer] + 1}</Circle>}

        {this.state.timer && carCrash !== 2 ? (
          <Timer time={30} key={currentPlayer} />
        ) : (
          <VotingBlock className="col-10 col-md-8 col-lg-6">
            {_.range(1, 11).map(num => (
              <VotingSingleElement
                disabled={lastPlayer ? num !== avaliableHandsAmount : num > this.state.handsLeft - deadPlayers}
                selected={lastPlayer ? num === avaliableHandsAmount : this.state.handsAmount[currentPlayer] === num}
                onClick={() => this.handClicked(num)}
                key={num}
              >
                <div className="number">{num}</div>
              </VotingSingleElement>
            ))}
          </VotingBlock>
        )}

        <PopUpButton
          color="Voting"
          onClick={lastPlayer || carCrash === 2 ? this.votingFinishedClicked : this.nextButtonClicked}
        >
          {lastPlayer || carCrash === 2 ? 'Завершить' : 'Далее'}
        </PopUpButton>
      </>
    );
  };
}

export default connect(
  ({ game, players }) => ({ game, players }),
  { clearSelectedNumbers, addToSelectedNumbers, killPlayer, changeGameState }
)(Voting);
