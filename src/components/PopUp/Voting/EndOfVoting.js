import React, { Component } from 'react';
import { connect } from 'react-redux';

import { killPlayer } from 'redux/actions/playersActions';
import { clearSelectedNumbers, changeGameState } from './../../../redux/actions/gameActions';
import { ResultsNumbers } from './styled-components/Results';
import { PopUpLabel, PopUpButton } from '../styled-components';
import TimerForPlayer from './TimerForPlayer';

class EndOfVoting extends Component {
  state = { notification: true };

  closeNotification = () => this.setState({ notification: false });

  goToNight = () => {
    this.props.clearSelectedNumbers();
    // this.props.lastMinuteFor.length === 0 && this.props.skipVotingDec();
    this.props.changeGameState({ phase: 'Night' });

    this.props.lastMinuteFor.map(plNum => this.props.killPlayer(plNum));
  };

  render = () => {
    if (this.state.notification)
      return (
        <>
          {this.props.lastMinuteFor.length > 0 ? (
            <>
              <PopUpLabel className="h1">Игру покидает</PopUpLabel>
              <ResultsNumbers>
                {this.props.lastMinuteFor.map(num => (
                  <div key={num}>{num + 1}</div>
                ))}
              </ResultsNumbers>

              <PopUpButton color="Voting" onClick={this.closeNotification}>
                ОК
              </PopUpButton>
            </>
          ) : (
            <>
              <PopUpLabel className="h1">Никто не уходит</PopUpLabel>
              <PopUpButton color="Voting" onClick={this.goToNight}>
                Ночь
              </PopUpButton>
            </>
          )}
        </>
      );

    return <TimerForPlayer listOfPlayers={this.props.lastMinuteFor} goToNight={this.goToNight} />;
  };
}

export default connect(
  ({ game, players }) => ({ game, players }),
  { killPlayer, clearSelectedNumbers, changeGameState }
)(EndOfVoting);
