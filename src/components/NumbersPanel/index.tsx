import { useSelector } from 'react-redux';

import { gameSelector } from 'redux/selectors';
import PHASE from 'common/phaseEnums';

import SeatAllocatorNumberPanel from './SeatAllocatorNumberPanel';
import DayNumberPanel from './DayNumberPanel';
import VotingNumberPanel from './VotingNumberPanel';
import NightNumberPanel from './NightNumberPanel';
import EndOfGameNumberPanel from './EndOfGameNumberPanel';
import RoleDealingNumberPanel from './RoleDealingNumberPanel';

export default function NumbersPanel() {
  const {
    gameState: { phase },
    selectedNumbers,
  } = useSelector(gameSelector);

  if (phase === PHASE.SEATALLOCATOR) return <SeatAllocatorNumberPanel />;
  if (phase === PHASE.DAY) return <DayNumberPanel />;
  if (phase === PHASE.VOTING) return <VotingNumberPanel />;
  if (phase === PHASE.NIGHT) return <NightNumberPanel />;
  if (phase === PHASE.ENDOFGAME) return <EndOfGameNumberPanel />;
  if (phase === PHASE.ROLEDEALING && selectedNumbers.length > 0) return <RoleDealingNumberPanel />;
  return null;
}
