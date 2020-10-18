import React from 'react';
import { useSelector } from 'react-redux';

import { ResultsNumbers } from './styled-components/Results';
import { PopUpLabel, PopUpButton } from '../styled-components';

export default ({ closeNotification }) => {
  const { selectedNumbers } = useSelector(({ game }) => game);

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
