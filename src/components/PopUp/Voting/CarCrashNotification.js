import React from 'react';
import { connect } from 'react-redux';

import PopUpButton from '../styled-components/PopUpButton';
import { ResultsNumbers } from './styled-components/Results';
import PopUpLabel from '../styled-components/PopUpLabel';

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
