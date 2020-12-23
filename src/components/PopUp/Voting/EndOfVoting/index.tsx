import { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { killPlayer } from 'redux/actions/playersActions';
import { playersSelector } from 'redux/selectors';
import { changeGameState, clearSelectedNumbers, skipVotingDisable } from 'redux/actions/gameActions';
import PHASE from 'common/phaseEnums';

import PlayersLastMinute from './PlayersLastMinute';
import VotingSkippedScreen from './VotingSkippedScreen';
import FinalResultScreen from './FinalResultScreen';

interface Props {
  votingSkipped: boolean;
  lastMinuteFor: number[];
  resetFn: () => void;
}

export default function EndOfVoting({ lastMinuteFor, resetFn, votingSkipped }: Props) {
  const dispatch = useDispatch();
  const players = useSelector(playersSelector);

  const [isFinalResultVisible, setIsFinalResultVisible] = useState(true);

  const goToNight = () => {
    batch(() => {
      dispatch(clearSelectedNumbers());
      votingSkipped && dispatch(skipVotingDisable());
      dispatch(changeGameState({ phase: PHASE.NIGHT }));

      lastMinuteFor.forEach(plNum => {
        if (!players[plNum].isAlive) dispatch(skipVotingDisable());
        dispatch(killPlayer(plNum));
      });
    });
  };

  if (votingSkipped) return <VotingSkippedScreen goToNight={goToNight} />;

  if (isFinalResultVisible)
    return (
      <FinalResultScreen
        lastMinuteFor={lastMinuteFor}
        goToNight={goToNight}
        resetFn={resetFn}
        setIsFinalResultVisible={setIsFinalResultVisible}
      />
    );

  return (
    <PlayersLastMinute
      listOfPlayers={lastMinuteFor}
      lastMinuteFor={lastMinuteFor}
      goToNight={goToNight}
      resetFn={resetFn}
    />
  );
}
