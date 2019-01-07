import React from 'react';
import { connect } from 'react-redux';

import { ResultsNumbers } from './styled-components/Results';
import { PopUpLabel, PopUpButton } from '../styled-components';

const CarCrashNotification = props => (
  <>
    <PopUpLabel className="h1">ПЕРЕГОЛОСОВКА</PopUpLabel>
    <ResultsNumbers>
      {props.game.selectedNumbers.map(num => (
        <div key={num}>{num + 1}</div>
      ))}
    </ResultsNumbers>

    <PopUpButton color="Voting" onClick={props.closeNotification}>
      ОК
    </PopUpButton>
  </>
);

const mapStateToProps = ({ game }) => ({ game });

export default connect(mapStateToProps)(CarCrashNotification);
