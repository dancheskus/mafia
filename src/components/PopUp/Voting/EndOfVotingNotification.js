import React from 'react';
import PopUpButton from '../style/PopUpButton';
import { ResultsLabel, ResultsNumbers } from './style/Results';

export default props => (
  <>
    {props.lastMinuteFor.length > 0 ? (
      <>
        <ResultsLabel className="h1">Игру покидает</ResultsLabel>
        <ResultsNumbers>
          {props.lastMinuteFor.map(num => (
            <div key={num}>{num + 1}</div>
          ))}
        </ResultsNumbers>

        <PopUpButton color="Voting" onClick={props.okClicked}>
          ОК
        </PopUpButton>
      </>
    ) : (
      <>
        <ResultsLabel className="h1">Никто не уходит</ResultsLabel>
        <PopUpButton color="Voting" onClick={props.goToNight}>
          Ночь
        </PopUpButton>
      </>
    )}
  </>
);
