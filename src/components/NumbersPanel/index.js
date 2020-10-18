import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { range, last } from 'lodash';

import { addToSelectedNumbers, clearSelectedNumbers, removeLastSelectedNumber } from 'redux/actions/gameActions';

import { Panel, PanelItem, PanelText } from './style';

const useNotSelectedNumbers = () => {
  const {
    game: { selectedNumbers },
  } = useSelector(state => state);
  return range(0, 10).filter(e => !selectedNumbers.includes(e));
};

const SeatAllocatorNumberPanel = () => {
  const {
    game: {
      gameState: { phase },
      selectedNumbers,
    },
  } = useSelector(state => state);

  const notSelectedNumbers = useNotSelectedNumbers();

  return (
    <Panel color={phase} className='seat-allocator-panel'>
      {selectedNumbers.map(selNum => (
        <PanelItem color={phase} key={selNum} selected>
          {selNum + 1}
        </PanelItem>
      ))}

      {notSelectedNumbers.map(notSelNum => (
        <PanelItem color={phase} key={notSelNum} />
      ))}
    </Panel>
  );
};

const DayNumberPanel = () => {
  const {
    game: {
      activePlayer,
      gameState: { phase },
      selectedNumbers,
      playerAddedToVotingList,
    },
    players,
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

const VotingNumberPanel = () => {
  const {
    game: {
      gameState: { phase },
      selectedNumbers,
    },
  } = useSelector(state => state);

  return (
    <Panel color={phase} itemsCentered>
      {selectedNumbers.map(selNum => (
        <PanelItem color={phase} key={selNum} selected>
          {selNum + 1}
        </PanelItem>
      ))}
    </Panel>
  );
};

const NightNumberPanel = () => {
  const {
    players,
    game: {
      gameState: { phase },
    },
  } = useSelector(state => state);

  const aliveMafiaAmount = players.filter(
    player => player.isAlive && (player.role === 'ДОН' || player.role === 'МАФИЯ')
  ).length;

  return (
    <Panel color={phase}>
      <PanelText>Живых мафов: {aliveMafiaAmount}</PanelText>
    </Panel>
  );
};

const EndOfGameNumberPanel = () => {
  const {
    players,
    game: {
      gameState: { phase },
    },
  } = useSelector(state => state);

  return (
    <Panel color={phase}>
      {players.map((player, i) => (
        <PanelItem
          isAlive={player.isAlive}
          color={phase}
          key={i}
          selected={player.role === 'ДОН' || player.role === 'МАФИЯ'}
        >
          {player.role === 'ШЕРИФ' ? 'Ш' : player.role === 'ДОН' ? 'Д' : i + 1}
        </PanelItem>
      ))}
    </Panel>
  );
};

const RoleDealingNumberPanel = () => {
  const {
    players,
    game: {
      gameState: { phase },
      numbersPanelClickable,
      selectedNumbers,
    },
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const selectPlayer = playerNumber => {
    if (!numbersPanelClickable) return;

    dispatch(clearSelectedNumbers());
    dispatch(addToSelectedNumbers(playerNumber));
  };

  return (
    <Panel color={phase} className='role-dealing-panel'>
      {range(0, 10).map(num => (
        <PanelItem
          pointer={numbersPanelClickable}
          color={phase}
          key={num}
          selected={num === selectedNumbers[0]}
          onClick={() => selectPlayer(num)}
        >
          {numbersPanelClickable && players[num].role === 'МАФИЯ' && 'М'}
          {numbersPanelClickable && players[num].role === 'ШЕРИФ' && 'Ш'}
          {numbersPanelClickable && players[num].role === 'ДОН' && 'Д'}
          {numbersPanelClickable && players[num].role === 'МИРНЫЙ' && num + 1}
          {!numbersPanelClickable && num + 1}
        </PanelItem>
      ))}
    </Panel>
  );
};

export default () => {
  const {
    game: {
      gameState: { phase },
      selectedNumbers,
    },
  } = useSelector(state => state);

  if (phase === 'SeatAllocator') return <SeatAllocatorNumberPanel />;
  if (phase === 'Day') return <DayNumberPanel />;
  if (phase === 'Voting') return <VotingNumberPanel />;
  if (phase === 'Night') return <NightNumberPanel />;
  if (phase === 'EndOfGame') return <EndOfGameNumberPanel />;
  if (phase === 'RoleDealing' && selectedNumbers.length > 0) return <RoleDealingNumberPanel />;
  return null;
};
