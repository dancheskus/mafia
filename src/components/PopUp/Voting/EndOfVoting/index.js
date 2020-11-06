import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { killPlayer } from 'redux/actions/playersActions';
import { playersSelector } from 'redux/selectors';
import { changeGameState, clearSelectedNumbers, skipVotingDec } from 'redux/actions/gameActions';

import PlayersLastMinute from './PlayersLastMinute';
import VotingSkippedScreen from './VotingSkippedScreen';
import FinalResultScreen from './FinalResultScreen';

export default ({ lastMinuteFor, resetFn, votingSkipped }) => {
  const dispatch = useDispatch();
  const players = useSelector(playersSelector);

  const [finalResultVisible, setFinalResultVisible] = useState(true);

  const goToNight = () => {
    batch(() => {
      dispatch(clearSelectedNumbers());
      votingSkipped && dispatch(skipVotingDec());
      dispatch(changeGameState({ phase: 'Night' }));

      lastMinuteFor.forEach(plNum => {
        if (!players[plNum].isAlive) dispatch(skipVotingDec());
        dispatch(killPlayer(plNum));
      });
    });
  };

  if (votingSkipped) return <VotingSkippedScreen goToNight={goToNight} />;

  if (finalResultVisible)
    return (
      <FinalResultScreen
        lastMinuteFor={lastMinuteFor}
        goToNight={goToNight}
        resetFn={resetFn}
        setFinalResultVisible={setFinalResultVisible}
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
};
