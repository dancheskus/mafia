import React from 'react';

import PopUpButton from '../styled-components/PopUpButton';
import { ResultsNumbers } from './styled-components/Results';
import PopUpLabel from '../styled-components/PopUpLabel';

export default props => (
  <>
    {props.lastMinuteFor.length > 0 ? (
      <>
        <PopUpLabel className="h1">Игру покидает</PopUpLabel>
        <ResultsNumbers>
          {props.lastMinuteFor.map(num => (
            <div key={num}>{num + 1}</div>
          ))}
        </ResultsNumbers>

        <PopUpButton color="Voting" onClick={props.closeNotification}>
          ОК
        </PopUpButton>
      </>
    ) : (
      <>
        <PopUpLabel className="h1">Никто не уходит</PopUpLabel>
        <PopUpButton color="Voting" onClick={props.goToNight}>
          Ночь
        </PopUpButton>
      </>
    )}
  </>
);
