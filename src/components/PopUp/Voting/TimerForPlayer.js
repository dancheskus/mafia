import React from 'react';
import { connect } from 'react-redux';
import PopUpButton from '../style/PopUpButton';
import Circle from './style/Circle';
import Timer from './../../Timer';

const TimerForPlayer = props => {
  const { carCrash, lastMinuteFor, currentPlayer } = props.state;

  return (
    <>
      <Circle>
        {carCrash === 2
          ? props.game.selectedNumbers[currentPlayer]
          : lastMinuteFor.length > 1
          ? lastMinuteFor[currentPlayer]
          : lastMinuteFor}
      </Circle>

      <Timer key={currentPlayer} />

      <PopUpButton
        color="Voting"
        onClick={props.lastPlayer || carCrash === 2 ? props.votingFinishedClicked : props.nextButtonClicked}
      >
        {props.lastPlayer || carCrash === 2 ? 'Ночь' : 'Далее'}
      </PopUpButton>
    </>
  );
};

const mapStateToProps = ({ game }) => ({ game });

export default connect(mapStateToProps)(TimerForPlayer);
