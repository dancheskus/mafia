import React from 'react';
import { useSelector } from 'react-redux';

import { PopUpButton, PopUpLabel } from 'components/PopUp/styled-components';
import { gameSelector } from 'redux/selectors';

import ResetButton from '../ResetButton';
import { ResultsNumbers } from '../style';

export default ({ lastMinuteFor, goToNight, resetFn, setFinalResultVisible }) => {
  const { selectedNumbers } = useSelector(gameSelector);

  return (
    <>
      {selectedNumbers.length > 1 && <ResetButton onClick={resetFn} />}

      {lastMinuteFor.length > 0 ? (
        <>
          <PopUpLabel className='h1'>Игру покидает</PopUpLabel>

          <ResultsNumbers>
            {lastMinuteFor.map(num => (
              <div key={num}>{num + 1}</div>
            ))}
          </ResultsNumbers>

          <PopUpButton color='Voting' onClick={() => setFinalResultVisible(false)}>
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
};
