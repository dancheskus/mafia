import React, { Component } from 'react';
import { range } from 'lodash';
import { connect } from 'react-redux';

import { PopUpButton, PopUpCircle, PopUpLabel } from '../styled-components';
import { VotingSingleElement, VotingBlock } from 'components/common';
import { clearSelectedNumbers, addToSelectedNumbers, changeGameState, skipVotingDec } from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';
import Timer from 'components/Timer';
import CarCrashNotification from './CarCrashNotification';
import EndOfVotingNotification from './EndOfVotingNotification';
import TimerForPlayer from './TimerForPlayer';
import checkForEnd from 'helpers/checkForEnd';

class Voting extends Component {
  initialState = {
    votesPerPlayer: Array(this.props.game.selectedNumbers.length).fill(0), // Кол-во проголосовавших за каждого игрока
    avaliableVoters: 10, // Кол-во живых и не проголосовавших
    currentPlayer: 0, // За кого голосуют в данный момент (от 0 до кол-во выставленных)
    timer: false, // Включен ли режим таймера
    carCrash: 0, // Стадия автокатастрофы. 0 - нет. 1 - переголосовка. 2 - Повторная ничья. НУЖНО ПРОВЕРИТЬ, ИСПОЛЬЗУЕТСЯ ЛИ 2 УРОВЕНЬ.
    сarCrashNotification: false, // Уведомление об автокатастрофе
    endOfVoting: false, // Заверешено ли голосование
    lastMinuteFor: [], // Игрок(и), которых выводят из города
  };

  state = { ...this.initialState };

  componentWillUpdate = () => {
    // При обновлении компонента, при необходимых условиях, завершаем игру
    checkForEnd(this.props.players).status && this.props.changeGameState({ phase: 'EndOfGame' });
  };

  componentWillMount = () => {
    // При подключении компонента
    if (
      // Если не 1-ый день и выставлен только 1 игрок и не пропускается голосование
      this.props.game.gameState.dayNumber > 1 &&
      this.props.game.selectedNumbers.length === 1 &&
      this.props.game.skipVoting === 0
    ) {
      // Заканчиваем голосование убивая единственного выставленного игрока
      this.votingFinishedClicked();
      this.props.killPlayer(this.props.game.selectedNumbers[0]);
    }
  };

  handClicked = num => {
    // Функция отвечает за выбор или снятие выбора кол-во голосов.
    const { currentPlayer, votesPerPlayer } = this.state;

    if (currentPlayer === this.props.game.selectedNumbers.length - 1) return; // На последнем игроке снять выбор нельзя

    const arr = [...votesPerPlayer];
    arr[currentPlayer] = votesPerPlayer[currentPlayer] === num ? null : num;
    this.setState({ votesPerPlayer: arr });
  };

  votingFinishedClicked = () => {
    const { lastMinuteFor, votesPerPlayer } = this.state;

    if (lastMinuteFor.length > 0) return this.goToNight(); // Если определены игроки покидающие город и нажата кнопка, то переходим в ночь

    const largestNumber = Math.max(...votesPerPlayer); // Вычисляем максимальное кол-во проголосовавших в 1-го игрока
    const newVotingList = [];
    votesPerPlayer.filter((el, i) => el === largestNumber && newVotingList.push(this.props.game.selectedNumbers[i]));
    // Если макс. число одно, то в новом списке будет 1 игрок, которого и выгонят. Если будет больше, то в массив будут добавлятся игроки с одинаковым кол-вом голосов

    if (newVotingList.length === 1 && !this.state.timer) this.props.killPlayer(newVotingList[0]);

    if (newVotingList.length > 1 && this.state.carCrash !== 2) {
      // Если одинаковое кол-во рук и автокатастрофа !== 2
      this.props.clearSelectedNumbers();
      newVotingList.map(num => this.props.addToSelectedNumbers(num));
      this.setState({ ...this.initialState, timer: true });

      if (!this.state.carCrash) this.setState({ сarCrashNotification: true });

      if (this.state.carCrash) this.setState({ carCrash: 2 });
    } else {
      this.setState({ endOfVoting: true });
      this.setState({ lastMinuteFor: lastMinuteFor.concat(newVotingList[0]) });
    }

    this.state.timer && this.setState({ ...this.initialState, carCrash: 1 });

    if (this.state.carCrash === 2) {
      const deadPlayers = this.props.players.filter(player => !player.isAlive).length;
      const avaliableHandsAmount = 10 - deadPlayers;

      this.setState({ endOfVoting: true });

      if (votesPerPlayer[0] > avaliableHandsAmount / 2) {
        this.setState({ lastMinuteFor: lastMinuteFor.concat(this.props.game.selectedNumbers) });

        this.props.game.selectedNumbers.map(player => this.props.killPlayer(player));
      }
    }
  };

  nextButtonClicked = () => {
    const { currentPlayer, votesPerPlayer, avaliableVoters } = this.state;
    const deadPlayers = this.props.players.filter(player => !player.isAlive).length;
    const votingPlayersAmount = this.props.game.selectedNumbers.length;

    if (currentPlayer < votingPlayersAmount - 1) {
      // Если НЕ последний игрок, увеличиваем игрока на 1 и вычисляем оставшееся кол-во рук. Если руки закончились, завершаем голосование.
      const avaliableVoters =
        this.state.votesPerPlayer.length >= 1 ? 10 - this.state.votesPerPlayer.reduce((a, b) => a + b) : 10;

      if (avaliableVoters - deadPlayers === 0) return this.votingFinishedClicked();

      this.setState({
        currentPlayer: currentPlayer + 1,
        avaliableVoters,
      });
    }

    if (votingPlayersAmount - 2 === currentPlayer) {
      // Если последний игрок, в него голосуют оставшиеся руки минус мертвые игроки
      const arr = [...votesPerPlayer];
      arr[currentPlayer + 1] = avaliableVoters - this.state.votesPerPlayer[currentPlayer] - deadPlayers;
      this.setState({ votesPerPlayer: arr });
    }
  };

  closeNotification = () => this.setState({ сarCrashNotification: false, endOfVoting: false });

  goToNight = () => {
    this.props.clearSelectedNumbers();
    this.state.lastMinuteFor.length === 0 && this.props.skipVotingDec();
    this.props.changeGameState({ phase: 'Night' });
  };

  render = () => {
    const deadPlayers = this.props.players.filter(player => !player.isAlive).length;
    const { carCrash, currentPlayer } = this.state;
    const { gameState, selectedNumbers, skipVoting } = this.props.game;
    const avaliableHandsAmount = this.state.votesPerPlayer[selectedNumbers.length - 1];
    const lastPlayer = this.state.currentPlayer === selectedNumbers.length - 1;

    if (
      (gameState.dayNumber === 1 && selectedNumbers.length === 1) ||
      (skipVoting > 0 && this.state.lastMinuteFor.length === 0)
    )
      return (
        <>
          {console.table({ ...this.state })}
          <PopUpLabel className="h2">Голосование не проводится</PopUpLabel>
          {skipVoting > 0 && <PopUpLabel className="h3">Игрок получил 4-й фол</PopUpLabel>}

          <PopUpButton color="Voting" onClick={this.goToNight}>
            Ночь
          </PopUpButton>
        </>
      );

    if (this.state.сarCrashNotification) return <CarCrashNotification closeNotification={this.closeNotification} />;

    if (this.state.endOfVoting)
      return (
        <EndOfVotingNotification
          closeNotification={this.closeNotification}
          goToNight={this.goToNight}
          lastMinuteFor={this.state.lastMinuteFor}
        />
      );

    // ДАЕТСЯ ПОСЛЕДНЯЯ МИНУТА, ТОМУ/ТЕМ КОГО ВЫГНАЛИ
    if (this.state.lastMinuteFor.length > 0)
      return (
        <>
          <TimerForPlayer
            state={{ ...this.state }}
            lastPlayer={lastPlayer}
            votingFinishedClicked={this.votingFinishedClicked}
            nextButtonClicked={this.nextButtonClicked}
          />
        </>
      );

    return (
      <>
        {carCrash === 1 && <PopUpLabel className="h2">Повторное голосование</PopUpLabel>}

        {carCrash === 2 && <PopUpLabel className="h2">Выгнать всех выставленных?</PopUpLabel>}

        {carCrash !== 2 && <PopUpCircle>{selectedNumbers[currentPlayer] + 1}</PopUpCircle>}

        {this.state.timer && carCrash !== 2 ? (
          <Timer time={30} key={currentPlayer} />
        ) : (
          <VotingBlock className="col-10 col-md-8 col-lg-6">
            {range(1, 11).map(num => (
              <VotingSingleElement
                disabled={lastPlayer ? num !== avaliableHandsAmount : num > this.state.avaliableVoters - deadPlayers}
                selected={lastPlayer ? num === avaliableHandsAmount : this.state.votesPerPlayer[currentPlayer] === num}
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
  { clearSelectedNumbers, addToSelectedNumbers, killPlayer, changeGameState, skipVotingDec }
)(Voting);
