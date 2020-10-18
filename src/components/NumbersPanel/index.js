import React from 'react';
import { useSelector } from 'react-redux';

import SeatAllocatorNumberPanel from './SeatAllocatorNumberPanel';
import DayNumberPanel from './DayNumberPanel';
import VotingNumberPanel from './VotingNumberPanel';
import NightNumberPanel from './NightNumberPanel';
import EndOfGameNumberPanel from './EndOfGameNumberPanel';
import RoleDealingNumberPanel from './RoleDealingNumberPanel';

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
