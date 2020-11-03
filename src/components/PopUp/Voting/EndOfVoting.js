import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { killPlayer } from 'redux/actions/playersActions';
import { ResetIcon } from 'icons/svgIcons';

import { clearSelectedNumbers, changeGameState, skipVotingDec } from '../../../redux/actions/gameActions';
import { ResultsNumbers } from './styled-components/Results';
import { PopUpLabel, PopUpButton } from '../styled-components';
import PlayersLastMinute from './PlayersLastMinute';
import ResetButton from './styled-components/ResetButton';

export default ({ lastMinuteFor, resetFn, votingSkipped }) => {
  const dispatch = useDispatch();
  const {
    game: {
      skipVoting,
      selectedNumbers,
      gameState: { dayNumber },
    },
    players,
  } = useSelector(store => store);

  const [notification, setNotification] = useState(true);

  useEffect(() => {
    return () => dispatch(clearSelectedNumbers());
  }, [dispatch]);

  const closeNotification = () => setNotification(false);

  const goToNight = () => {
    dispatch(clearSelectedNumbers());
    votingSkipped && dispatch(skipVotingDec());
    dispatch(changeGameState({ phase: 'Night' }));

    lastMinuteFor.forEach(plNum => {
      if (!players[plNum].isAlive) dispatch(skipVotingDec());
      dispatch(killPlayer(plNum));
    });
  };

  if (votingSkipped)
    return (
      <>
        <PopUpLabel className='h2'>Голосование не проводится</PopUpLabel>
        {selectedNumbers.length === 1 && dayNumber === 1 ? (
          <PopUpLabel light className='h3'>
            Один игрок в первый день не голосуется
          </PopUpLabel>
        ) : (
          skipVoting > 0 && (
            <PopUpLabel light className='h3'>
              Игрок получил 4-й фол
            </PopUpLabel>
          )
        )}

        <PopUpButton color='Voting' onClick={goToNight}>
          Ночь
        </PopUpButton>
      </>
    );

  if (notification)
    return (
      <>
        <ResetButton onClick={resetFn}>
          <ResetIcon size='75%' />
        </ResetButton>

        {lastMinuteFor.length > 0 ? (
          <>
            <PopUpLabel className='h1'>Игру покидает</PopUpLabel>
            <ResultsNumbers>
              {lastMinuteFor.map(num => (
                <div key={num}>{num + 1}</div>
              ))}
            </ResultsNumbers>

            <PopUpButton color='Voting' onClick={closeNotification}>
              ОК
            </PopUpButton>
          </>
        ) : (
          <>
            <PopUpLabel className='h1'>Никто не уходит</PopUpLabel>
            <PopUpButton color='Voting' onClick={goToNight}>
              Ночь
            </PopUpButton>
          </>
        )}
      </>
    );

  return (
    <>
      <ResetButton onClick={resetFn}>
        <ResetIcon size='75%' />
      </ResetButton>

      <PlayersLastMinute listOfPlayers={lastMinuteFor} lastMinuteFor={lastMinuteFor} goToNight={goToNight} />
    </>
  );
};
