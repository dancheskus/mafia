import React from 'react';
import { connect } from 'react-redux';

import { PopUpCircle, PopUpButton } from '../styled-components';
import Timer from './../../Timer';

const TimerForPlayer = ({ lastPlayer, votingFinishedClicked, nextButtonClicked, state }) => {
  const { lastMinuteFor, currentPlayer } = state;

  const exitLastMinute = lastPlayer || lastMinuteFor.length === 1;

  return (
    <>
      <PopUpCircle>{lastMinuteFor.length > 1 ? lastMinuteFor[currentPlayer] + 1 : lastMinuteFor[0] + 1}</PopUpCircle>

      <Timer key={currentPlayer} />

      <PopUpButton color="Voting" onClick={exitLastMinute ? votingFinishedClicked : nextButtonClicked}>
        {exitLastMinute ? 'Ночь' : 'Далее'}
      </PopUpButton>
    </>
  );
};

export default connect(({ game }) => ({ game }))(TimerForPlayer);
