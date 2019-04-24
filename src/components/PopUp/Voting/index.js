import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Howl } from 'howler';

import { PopUpButton, PopUpCircle, PopUpLabel } from '../styled-components';
import { clearSelectedNumbers, addToSelectedNumbers, changeGameState, skipVotingDec } from 'redux/actions/gameActions';
import EndOfVoting from './EndOfVoting';
import checkForEnd from 'helpers/checkForEnd';
import VictimSelector from 'components/common/VictimSelector';
import CarCrash from './CarCrash';
import secondsSoundFile from '../../../audio/Countdown_10sec_effects.mp3';
import { ResetIcon } from 'icons/svgIcons';
import ResetButton from './styled-components/ResetButton';

const BottomButtonGroup = styled.div`
  flex-direction: row;

  > :not(:last-child) {
    margin-right: 20px;
    background: ${({ buttonOncePressed }) => buttonOncePressed && 'darkred'};
  }
`;

class Voting extends Component {
  initialState = {
    votesPerPlayer: Array(this.props.game.selectedNumbers.length).fill(0), // Кол-во проголосовавших за каждого игрока
    avaliableVoters: 9 - this.props.players.filter(player => !player.isAlive).length, // Кол-во живых и не проголосовавших
    currentPlayer: 0, // За кого голосуют в данный момент (от 0 до кол-во выставленных)
    carCrash: false, // Стадия автокатастрофы. 0 - нет. 1 - переголосовка. 2 - Повторная ничья. НУЖНО ПРОВЕРИТЬ, ИСПОЛЬЗУЕТСЯ ЛИ 2 УРОВЕНЬ.
    carCrashClosed: false, // true, после первой автокатастрофы
    endOfVoting: false,
    lastMinuteFor: [], // Игрок(и), которых выводят из города
    timerStarted: false,
    timerStopped: false,
  };

  initialSelectedNumbers = this.props.game.selectedNumbers;

  state = { ...this.initialState };

  componentWillUpdate = () => {
    // При обновлении компонента, при необходимых условиях, завершаем игру
    checkForEnd(this.props.players).status && this.props.changeGameState({ phase: 'EndOfGame' });
  };

  componentWillMount = () => {
    const { gameState, selectedNumbers, skipVoting } = this.props.game;
    // Если не 1-ый день и выставлен только 1 игрок и не пропускается голосование, заканчиваем голосование убивая единственного выставленного игрока
    if (gameState.dayNumber > 1 && selectedNumbers.length === 1 && !skipVoting) this.votingFinishedClicked();

    if ((gameState.dayNumber === 1 && selectedNumbers.length === 1) || skipVoting) this.setState({ endOfVoting: true });

    this.stopVotingSound = new Howl({
      src: `${secondsSoundFile}`,
      sprite: { oneSec: [0, 1020] },
    });
  };

  componentWillUnmount = () => {
    const numberOfVotedOutPlayersWithFourthFoul = this.state.lastMinuteFor.filter(
      plNum => !this.props.players[plNum].isAlive
    ).length;
    if (this.props.game.skipVoting && this.state.lastMinuteFor.length !== 0) {
      for (let i = 0; i < numberOfVotedOutPlayersWithFourthFoul; i++) this.props.skipVotingDec();
    }
    clearInterval(this.timer);
  };

  onNumberSelected = num => {
    const { currentPlayer, votesPerPlayer } = this.state;

    const arr = [...votesPerPlayer];
    arr[currentPlayer] = votesPerPlayer[currentPlayer] === num + 1 ? null : num + 1;
    this.setState({ votesPerPlayer: arr });
  };

  closeCarCrash = () => this.setState({ ...this.initialState, carCrashClosed: true });

  getNewVotingList = () => {
    const { votesPerPlayer } = this.state;

    const largestNumber = Math.max(...votesPerPlayer); // Вычисляем максимальное кол-во проголосовавших в одного игрока
    const newVotingList = [];
    votesPerPlayer.filter((el, i) => el === largestNumber && newVotingList.push(this.props.game.selectedNumbers[i]));
    // Если макс. число одно, то в новом списке будет 1 игрок, которого и выгонят. Если будет больше, то в массив будут добавлятся игроки с одинаковым кол-вом голосов

    return newVotingList;
  };

  votingFinishedClicked = killAll => {
    const { lastMinuteFor } = this.state;
    const newVotingList = this.getNewVotingList();

    if (newVotingList.length === 1) {
      // Если остался 1 игрок, то он умирает
      this.setState({ endOfVoting: true, lastMinuteFor: lastMinuteFor.concat(newVotingList[0]) });
    }

    // УБИЙСТВО ВСЕХ ПОСЛЕ АВТОКАТАСТРОФЫ
    if (killAll === true) {
      this.setState({
        endOfVoting: true,
        lastMinuteFor: lastMinuteFor.concat(this.props.game.selectedNumbers),
      });
    }

    // УБИЙСТВО НИКОГО ПОСЛЕ АВТОКАТАСТРОФЫ
    if (killAll === false) return this.setState({ lastMinuteFor: [], endOfVoting: true });

    // ВКЛЮЧЕНИЕ АВТОКАТАСТРОФЫ
    if (newVotingList.length > 1) {
      // Если выставлено больше 2 игроков
      if (!this.state.carCrashClosed) {
        // Первый раз одинаковое кол-во голосов
        this.props.clearSelectedNumbers();
        newVotingList.map(num => this.props.addToSelectedNumbers(num));
      }
      this.setState({ carCrash: true });
    }
  };

  countAvaliableVoters = () => {
    const deadPlayers = this.props.players.filter(player => !player.isAlive).length;
    const avaliableVoters =
      this.state.votesPerPlayer.length >= 1 ? 9 - this.state.votesPerPlayer.reduce((a, b) => a + b) : 9;

    this.setState({ avaliableVoters: avaliableVoters - deadPlayers });
  };

  nextButtonClicked = () => {
    const { currentPlayer, votesPerPlayer, avaliableVoters } = this.state;
    const votingPlayersAmount = this.props.game.selectedNumbers.length;
    const votersLeft = avaliableVoters - this.state.votesPerPlayer[currentPlayer] + 1;

    this.countAvaliableVoters();
    this.setState({ timerStopped: false });

    if (currentPlayer < votingPlayersAmount - 1) {
      // Если НЕ последний игрок, увеличиваем игрока на 1 и вычисляем оставшееся кол-во рук. Если руки закончились, завершаем голосование.
      if (votersLeft === 0) return this.votingFinishedClicked();
      this.setState({ currentPlayer: currentPlayer + 1 });
    }

    if (votingPlayersAmount - 2 === currentPlayer) {
      // Если последний игрок, в него голосуют оставшиеся руки минус мертвые игроки
      const arr = [...votesPerPlayer];
      arr[currentPlayer + 1] = votersLeft;
      this.setState({ votesPerPlayer: arr });
    }
  };

  timerClicked = () => {
    if (this.state.timerStarted) return;
    this.setState({ timerStarted: true });

    this.timer = setTimeout(() => {
      this.stopVotingSound.play('oneSec');
      this.setState({ timerStopped: true, timerStarted: false });
    }, 2000);
  };

  resetVoting = () => {
    if (window.confirm('Сбросить голосование?')) {
      this.setState({ ...this.initialState });
      this.props.clearSelectedNumbers();
      this.initialSelectedNumbers.forEach(num => {
        this.props.addToSelectedNumbers(num);
      });
    }
  };

  render = () => {
    const { currentPlayer, lastMinuteFor } = this.state;
    const { selectedNumbers, skipVoting } = this.props.game;
    const lastPlayer = currentPlayer === selectedNumbers.length - 1;

    if (this.state.endOfVoting || skipVoting)
      return (
        <EndOfVoting
          resetFn={this.resetVoting}
          votingSkipped={
            (skipVoting && lastMinuteFor.length === 0) ||
            (this.props.game.gameState.dayNumber === 1 && this.props.game.selectedNumbers.length === 1)
          }
          lastMinuteFor={lastMinuteFor}
        />
      );

    if (this.state.carCrash)
      return (
        <>
          <ResetButton onClick={this.resetVoting}>
            <ResetIcon size='75%' />
          </ResetButton>

          <CarCrash
            closeCarCrash={this.closeCarCrash}
            secondTime={this.state.carCrashClosed}
            votingFinishedClicked={this.votingFinishedClicked}
          />
        </>
      );

    return (
      <>
        <ResetButton onClick={this.resetVoting}>
          <ResetIcon size='75%' />
        </ResetButton>

        {this.state.carCrashClosed && <PopUpLabel className='h2'>Повторное голосование</PopUpLabel>}

        <PopUpCircle mini={this.state.carCrashClosed}>{selectedNumbers[currentPlayer] + 1 || null}</PopUpCircle>

        <VictimSelector
          lastPlayer={lastPlayer} // для автоматической подсветки при последнем игроке
          votesLeft={this.state.avaliableVoters} // для disabled кнопки
          key={currentPlayer} // чтобы перерендеривался каждый раз
          onNumberSelected={this.onNumberSelected} // callback
        />

        <BottomButtonGroup buttonOncePressed={this.state.timerStopped || this.state.timerStarted}>
          <PopUpButton color='Voting' onClick={this.timerClicked}>
            2 сек
          </PopUpButton>

          <PopUpButton color='Voting' onClick={lastPlayer ? this.votingFinishedClicked : this.nextButtonClicked}>
            {lastPlayer ? 'Завершить' : 'Далее'}
          </PopUpButton>
        </BottomButtonGroup>
      </>
    );
  };
}

export default connect(
  ({ game, players }) => ({ game, players }),
  { clearSelectedNumbers, addToSelectedNumbers, changeGameState, skipVotingDec }
)(Voting);
