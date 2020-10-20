import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Howl } from 'howler';

import { clearSelectedNumbers, addToSelectedNumbers, changeGameState, skipVotingDec } from 'redux/actions/gameActions';
import checkForEnd from 'helpers/checkForEnd';
import VictimSelector from 'components/common/VictimSelector';
import { ResetIcon } from 'icons/svgIcons';
import secondsSoundFile from 'audio/Countdown_10sec_effects.mp3';

import { PopUpButton, PopUpCircle, PopUpLabel } from '../styled-components';
import EndOfVoting from './EndOfVoting';
import CarCrash from './CarCrash';
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

  UNSAFE_componentWillUpdate = () => {
    const { players, changeGameState } = this.props;
    // При обновлении компонента, при необходимых условиях, завершаем игру
    checkForEnd(players).status && changeGameState({ phase: 'EndOfGame' });
  };

  UNSAFE_componentWillMount = () => {
    const {
      gameState: { dayNumber },
      selectedNumbers,
      skipVoting,
    } = this.props.game;
    // Если не 1-ый день и выставлен только 1 игрок и не пропускается голосование, заканчиваем голосование убивая единственного выставленного игрока
    if (dayNumber > 1 && selectedNumbers.length === 1 && !skipVoting) this.votingFinishedClicked();

    if ((dayNumber === 1 && selectedNumbers.length === 1) || skipVoting) this.setState({ endOfVoting: true });

    this.stopVotingSound = new Howl({
      src: `${secondsSoundFile}`,
      sprite: { oneSec: [0, 1020] },
    });
  };

  componentWillUnmount = () => {
    const {
      game: { skipVoting },
      players,
      skipVotingDec,
    } = this.props;
    const { lastMinuteFor } = this.state;

    const numberOfVotedOutPlayersWithFourthFoul = lastMinuteFor.filter(plNum => !players[plNum].isAlive).length;

    if (skipVoting && lastMinuteFor.length !== 0) {
      for (let i = 0; i < numberOfVotedOutPlayersWithFourthFoul; i++) skipVotingDec();
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
    const {
      game: { selectedNumbers },
    } = this.props;

    const largestNumber = Math.max(...votesPerPlayer); // Вычисляем максимальное кол-во проголосовавших в одного игрока
    const newVotingList = [];
    votesPerPlayer.filter((el, i) => el === largestNumber && newVotingList.push(selectedNumbers[i]));
    // Если макс. число одно, то в новом списке будет 1 игрок, которого и выгонят. Если будет больше, то в массив будут добавлятся игроки с одинаковым кол-вом голосов

    return newVotingList;
  };

  votingFinishedClicked = killAll => {
    const { lastMinuteFor, carCrashClosed } = this.state;
    const {
      clearSelectedNumbers,
      addToSelectedNumbers,
      game: { selectedNumbers },
    } = this.props;
    const newVotingList = this.getNewVotingList();

    if (newVotingList.length === 1) {
      // Если остался 1 игрок, то он умирает
      this.setState({ endOfVoting: true, lastMinuteFor: lastMinuteFor.concat(newVotingList[0]) });
    }

    // УБИЙСТВО ВСЕХ ПОСЛЕ АВТОКАТАСТРОФЫ
    if (killAll === true) {
      this.setState({
        endOfVoting: true,
        lastMinuteFor: lastMinuteFor.concat(selectedNumbers),
      });
    }

    // УБИЙСТВО НИКОГО ПОСЛЕ АВТОКАТАСТРОФЫ
    if (killAll === false) return this.setState({ lastMinuteFor: [], endOfVoting: true });

    // ВКЛЮЧЕНИЕ АВТОКАТАСТРОФЫ
    if (newVotingList.length > 1) {
      // Если выставлено больше 2 игроков
      if (!carCrashClosed) {
        // Первый раз одинаковое кол-во голосов
        clearSelectedNumbers();
        newVotingList.map(num => addToSelectedNumbers(num));
      }
      this.setState({ carCrash: true });
    }
  };

  countAvaliableVoters = () => {
    const { votesPerPlayer } = this.state;
    const { players } = this.props;

    const deadPlayers = players.filter(player => !player.isAlive).length;
    const avaliableVoters = votesPerPlayer.length >= 1 ? 9 - votesPerPlayer.reduce((a, b) => a + b) : 9;

    this.setState({ avaliableVoters: avaliableVoters - deadPlayers });
  };

  nextButtonClicked = () => {
    const { currentPlayer, votesPerPlayer, avaliableVoters } = this.state;
    const {
      game: { selectedNumbers },
    } = this.props;

    const votingPlayersAmount = selectedNumbers.length;
    const votersLeft = avaliableVoters - votesPerPlayer[currentPlayer] + 1;

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
    const { timerStarted } = this.state;

    if (timerStarted) return;
    this.setState({ timerStarted: true });

    this.timer = setTimeout(() => {
      this.stopVotingSound.play('oneSec');
      this.setState({ timerStopped: true, timerStarted: false });
    }, 2000);
  };

  resetVoting = () => {
    const { clearSelectedNumbers, addToSelectedNumbers } = this.props;

    if (window.confirm('Сбросить голосование?')) {
      this.setState({ ...this.initialState });
      clearSelectedNumbers();
      this.initialSelectedNumbers.forEach(num => {
        addToSelectedNumbers(num);
      });
    }
  };

  render = () => {
    const {
      currentPlayer,
      lastMinuteFor,
      endOfVoting,
      carCrash,
      carCrashClosed,
      avaliableVoters,
      timerStopped,
      timerStarted,
    } = this.state;
    const {
      selectedNumbers,
      skipVoting,
      gameState: { dayNumber },
    } = this.props.game;

    const lastPlayer = currentPlayer === selectedNumbers.length - 1;

    if (endOfVoting || skipVoting)
      return (
        <EndOfVoting
          resetFn={this.resetVoting}
          votingSkipped={
            (skipVoting && lastMinuteFor.length === 0) || (dayNumber === 1 && selectedNumbers.length === 1)
          }
          lastMinuteFor={lastMinuteFor}
        />
      );

    if (carCrash)
      return (
        <>
          <ResetButton onClick={this.resetVoting}>
            <ResetIcon size='75%' />
          </ResetButton>

          <CarCrash
            closeCarCrash={this.closeCarCrash}
            secondTime={carCrashClosed}
            votingFinishedClicked={this.votingFinishedClicked}
          />
        </>
      );

    return (
      <>
        <ResetButton onClick={this.resetVoting}>
          <ResetIcon size='75%' />
        </ResetButton>

        {carCrashClosed && <PopUpLabel className='h2'>Повторное голосование</PopUpLabel>}

        <PopUpCircle mini={carCrashClosed}>{selectedNumbers[currentPlayer] + 1 || null}</PopUpCircle>

        <VictimSelector
          lastPlayer={lastPlayer} // для автоматической подсветки при последнем игроке
          votesLeft={avaliableVoters} // для disabled кнопки
          key={currentPlayer} // чтобы перерендеривался каждый раз
          onNumberSelected={this.onNumberSelected} // callback
        />

        <BottomButtonGroup buttonOncePressed={timerStopped || timerStarted}>
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

export default connect(({ game, players }) => ({ game, players }), {
  clearSelectedNumbers,
  addToSelectedNumbers,
  changeGameState,
  skipVotingDec,
})(Voting);
