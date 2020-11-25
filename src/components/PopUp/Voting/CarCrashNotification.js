import React from 'react';
import { useSelector } from 'react-redux';

import { gameSelector } from 'redux/selectors';

import { ResultsNumbers } from './style';
import { PopUpLabel, PopUpButton } from '../styled-components';

export default ({ closeNotification }) => {
  const { selectedNumbers } = useSelector(gameSelector);

  return (
    <>
      <PopUpLabel className='h1'>ПЕРЕГОЛОСОВКА</PopUpLabel>

      <ResultsNumbers>
        {selectedNumbers.map(num => (
          <div key={num}>{num + 1}</div>
        ))}
      </ResultsNumbers>

      <PopUpButton color='Voting' onClick={closeNotification}>
        ОК
      </PopUpButton>
    </>
  );
};
