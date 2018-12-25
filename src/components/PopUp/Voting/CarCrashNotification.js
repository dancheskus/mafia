import React from 'react';
import { connect } from 'react-redux';
import PopUpButton from '../style/PopUpButton';
import { ResultsLabel, ResultsNumbers } from './style/Results';

const CarCrashNotification = props => (
  <>
    <ResultsLabel className="h1">ПЕРЕГОЛОСОВКА</ResultsLabel>
    <ResultsNumbers>
      {props.game.selectedNumbers.map(num => (
        <div key={num}>{num}</div>
      ))}
    </ResultsNumbers>

    <PopUpButton color="Voting" onClick={props.okClicked}>
      ОК
    </PopUpButton>
  </>
);

const mapStateToProps = ({ game }) => ({ game });

export default connect(mapStateToProps)(CarCrashNotification);
