import React from 'react';
import { useSelector } from 'react-redux';

import { PopUpButton, PopUpLabel } from 'components/PopUp/styled-components';
import { gameSelector } from 'redux/selectors';

export default function VotingSkippedScreen({ goToNight }: { goToNight: () => void }) {
  const {
    skipVoting,
    selectedNumbers,
    gameState: { dayNumber },
  } = useSelector(gameSelector);

  return (
    <>
      <PopUpLabel className='h2'>Голосование не проводится</PopUpLabel>

      {selectedNumbers.length === 1 && dayNumber === 1 ? (
        <PopUpLabel light className='h3'>
          Один игрок в первый день не голосуется
        </PopUpLabel>
      ) : (
        skipVoting && (
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
}
