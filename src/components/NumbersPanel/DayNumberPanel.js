import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { last } from 'lodash';

import { addToSelectedNumbers, removeLastSelectedNumber } from 'redux/actions/gameActions';

import { useNotSelectedNumbers } from './helper';
import { Panel, PanelItem } from './style';

export default () => {
  const {
    players,
    game: {
      activePlayer,
      gameState: { phase },
      selectedNumbers,
      playerAddedToVotingList,
    },
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const [playerAddedNumber, setPlayerAddedNumber] = useState(false);

  const isCurrentPlayerMuted = players[activePlayer].fouls.muted;

  useEffect(() => {
    const playerMadeStepBack = playerAddedToVotingList[0] === activePlayer;

    if (!playerAddedNumber && playerMadeStepBack) setPlayerAddedNumber(true);
  }, [activePlayer, playerAddedToVotingList, playerAddedNumber]);

  const deselectNumber = lastAddedNumber => {
    if (!lastAddedNumber) return;

    dispatch(removeLastSelectedNumber());
    setPlayerAddedNumber(false);
  };

  const selectNumber = notSelNum => {
    if (!playerAddedNumber) dispatch(addToSelectedNumbers(notSelNum));

    if (playerAddedNumber) {
      dispatch(removeLastSelectedNumber());
      dispatch(addToSelectedNumbers(notSelNum));
    }

    setPlayerAddedNumber(true);
  };

  const notSelectedNumbers = useNotSelectedNumbers();

  return (
    <Panel color={phase} className='day-panel' flash={isCurrentPlayerMuted}>
      {selectedNumbers.map(selNum => {
        const lastAddedNumber = selNum === last(selectedNumbers) && playerAddedNumber;

        return (
          <PanelItem
            color={phase}
            key={selNum}
            pointer
            border={lastAddedNumber}
            onClick={() => deselectNumber(lastAddedNumber)}
            selected
          >
            {selNum + 1}
          </PanelItem>
        );
      })}

      {notSelectedNumbers.map(
        notSelNum =>
          players[notSelNum].isAlive && (
            <PanelItem
              color={phase}
              key={notSelNum}
              pointer
              border={!playerAddedNumber}
              onClick={() => selectNumber(notSelNum)}
            >
              {notSelNum + 1}
            </PanelItem>
          )
      )}
    </Panel>
  );
};