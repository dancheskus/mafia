import React from 'react';
import { connect } from 'react-redux';
import PopUpButton from '../styled-components/PopUpButton';
import Circle from '../styled-components/PopUpCircle';
import Timer from './../../Timer';

const TimerForPlayer = ({ lastPlayer, votingFinishedClicked, nextButtonClicked, state }) => {
  const { lastMinuteFor, currentPlayer } = state;

  return (
    <>
      <Circle>{lastMinuteFor.length > 1 ? lastMinuteFor[currentPlayer] + 1 : lastMinuteFor[0] + 1}</Circle>

      <Timer key={currentPlayer} />

      <PopUpButton color="Voting" onClick={lastPlayer ? votingFinishedClicked : nextButtonClicked}>
        {lastPlayer ? 'Ночь' : 'Далее'}
      </PopUpButton>
    </>
  );
};

export default connect(({ game }) => ({ game }))(TimerForPlayer);
