import { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { last } from 'lodash';

import { addToSelectedNumbers, removeLastSelectedNumber } from 'redux/actions/gameActions';
import { gameSelector, playersSelector } from 'redux/selectors';
import PHASE from 'common/phaseEnums';

import useNotSelectedNumbers from './useNotSelectedNumbers';
import { Panel, PanelItem } from './style';

const phase = PHASE.DAY;

export default function DayNumberPanel() {
  const { activePlayer, selectedNumbers, playerAddedToVotingList, skipVoting } = useSelector(gameSelector);
  const players = useSelector(playersSelector);
  const dispatch = useDispatch();

  const [playerAddedNumber, setPlayerAddedNumber] = useState(false);

  const isCurrentPlayerMuted = players[activePlayer].fouls.muted;

  useEffect(() => {
    const playerMadeStepBack = playerAddedToVotingList[0] === activePlayer;

    if (!playerAddedNumber && playerMadeStepBack) setPlayerAddedNumber(true);
  }, [activePlayer, playerAddedToVotingList, playerAddedNumber]);

  const deselectNumber = (lastAddedNumber: boolean) => {
    if (!lastAddedNumber) return;

    dispatch(removeLastSelectedNumber());
    setPlayerAddedNumber(false);
  };

  const selectNumber = (notSelNum: number) => {
    batch(() => {
      if (!playerAddedNumber) dispatch(addToSelectedNumbers(notSelNum));

      if (playerAddedNumber) {
        dispatch(removeLastSelectedNumber());
        dispatch(addToSelectedNumbers(notSelNum));
      }
    });

    setPlayerAddedNumber(true);
  };

  const notSelectedNumbers = useNotSelectedNumbers();

  return (
    <Panel skipVoting={skipVoting} color={phase} className='day-panel' flash={isCurrentPlayerMuted}>
      {selectedNumbers.map(selNum => {
        const lastAddedNumber = selNum === last(selectedNumbers) && playerAddedNumber;

        return (
          <PanelItem
            color={phase}
            key={selNum}
            pointer={lastAddedNumber}
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
          ),
      )}
    </Panel>
  );
}
