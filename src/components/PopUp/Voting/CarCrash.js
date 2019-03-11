import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CarCrashNotification from './CarCrashNotification';
import { PopUpButton, PopUpCircle, PopUpLabel } from '../styled-components/';
import Timer from 'components/Timer';
import VictimSelector from 'components/common/VictimSelector';

const CarCrash = props => {
  const [notification, setNotification] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(null);

  useEffect(() => {
    if (props.secondTime && !props.settings.multiplePlayerRemove) stopVoting();
  }, []);

  const closeNotification = () => setNotification(false);

  const nextPlayer = () => setCurrentPlayer(currentPlayer + 1);

  const onNumberSelected = num => setSelectedNumber(num + 1 === selectedNumber ? null : num + 1);

  const stopVoting = () => {
    const alivePlayers = props.players.filter(player => player.isAlive).length;

    props.votingFinishedClicked(selectedNumber > alivePlayers / 2);
  };

  const { selectedNumbers } = props.game;
  const lastPlayer = currentPlayer === selectedNumbers.length - 1;
  const deadPlayers = props.players.filter(player => !player.isAlive).length;

  if (props.secondTime)
    return (
      <>
        <PopUpLabel className="h2 text-warning">Вывести всех выставленных?</PopUpLabel>

        <VictimSelector onNumberSelected={onNumberSelected} votesLeft={9 - deadPlayers} />

        <PopUpButton color="Voting" onClick={stopVoting}>
          Завершить
        </PopUpButton>
      </>
    );

  if (notification) return <CarCrashNotification closeNotification={closeNotification} />;

  return (
    <>
      <PopUpCircle>{selectedNumbers[currentPlayer] + 1}</PopUpCircle>

      <Timer time={30} key={currentPlayer} />

      <PopUpButton color="Voting" onClick={lastPlayer ? props.closeCarCrash : nextPlayer}>
        {lastPlayer ? 'Завершить' : 'Далее'}
      </PopUpButton>
    </>
  );
};

export default connect(({ game, players, settings }) => ({ game, players, settings }))(CarCrash);
