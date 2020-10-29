// КОМПОНЕНТ ДОЛЖЕН ПРИНИМАТЬ:
// 1. список уходящих игроков
// 2. коллбэк уводящий в ночь

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Timer from 'components/Timer';
import checkForEnd from 'helpers/checkForEnd';
import { changeGameState } from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';

import { PopUpCircle, PopUpButton } from '../styled-components';

export default props => {
  const dispatch = useDispatch();
  const players = useSelector(({ players }) => players);

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [listOfPlayers, setListOfPlayers] = useState(props.listOfPlayers);

  useEffect(() => {
    return () => {
      if (checkForEnd(players, listOfPlayers).status) {
        listOfPlayers.map(plNum => dispatch(killPlayer(plNum)));
        dispatch(changeGameState({ phase: 'EndOfGame' }));
      }
    };
  }, [dispatch, listOfPlayers, players]);

  const nextPlayer = () => setCurrentPlayer(currentPlayer + 1);

  const lastPlayer = listOfPlayers.length - 1 - currentPlayer === 0;

  return (
    <>
      <PopUpCircle>{listOfPlayers[currentPlayer] + 1}</PopUpCircle>

      <Timer
        key={currentPlayer}
        killedOnLastMinute={props.killedOnLastMinute[currentPlayer]}
        time={listOfPlayers.length > 1 && 30}
      />

      <PopUpButton color='Voting' onClick={lastPlayer ? props.goToNight : nextPlayer}>
        {lastPlayer ? 'Ночь' : 'Далее'}
      </PopUpButton>
    </>
  );
};

// export default connect(({ players }) => ({ players }), { changeGameState, killPlayer })(PlayersLastMinute);
