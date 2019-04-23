import React, { Component } from 'react';
import { connect } from 'react-redux';

import { killPlayer } from 'redux/actions/playersActions';
import { clearSelectedNumbers, changeGameState, skipVotingDec } from './../../../redux/actions/gameActions';
import { ResultsNumbers } from './styled-components/Results';
import { PopUpLabel, PopUpButton } from '../styled-components';
import PlayersLastMinute from './PlayersLastMinute';
import { ResetIcon } from 'icons/svgIcons';
import ResetButton from './styled-components/ResetButton';

class EndOfVoting extends Component {
  state = { notification: true };

  killedOnLastMinute = Array(this.props.lastMinuteFor.length).fill(false);

  componentDidUpdate = () => {
    this.killedOnLastMinute = this.props.lastMinuteFor.map(plNum => !this.props.players[plNum].isAlive);
  };

  closeNotification = () => this.setState({ notification: false });

  goToNight = () => {
    this.props.clearSelectedNumbers();
    this.props.votingSkipped && this.props.skipVotingDec();
    this.props.changeGameState({ phase: 'Night' });

    this.props.lastMinuteFor.forEach(plNum => {
      if (!this.props.players[plNum].isAlive) this.props.skipVotingDec();
      this.props.killPlayer(plNum);
    });
  };

  render = () => {
    const {
      lastMinuteFor,
      game: { skipVoting },
    } = this.props;

    if (this.props.votingSkipped)
      return (
        <>
          <PopUpLabel className='h2'>Голосование не проводится</PopUpLabel>
          {skipVoting > 0 && (
            <PopUpLabel light className='h3'>
              Игрок получил 4-й фол
            </PopUpLabel>
          )}

          <PopUpButton color='Voting' onClick={this.goToNight}>
            Ночь
          </PopUpButton>
        </>
      );

    if (this.state.notification)
      return (
        <>
          <ResetButton onClick={this.props.resetFn}>
            <ResetIcon size='75%' />
          </ResetButton>

          {lastMinuteFor.length > 0 ? (
            <>
              <PopUpLabel className='h1'>Игру покидает</PopUpLabel>
              <ResultsNumbers>
                {lastMinuteFor.map(num => (
                  <div key={num}>{num + 1}</div>
                ))}
              </ResultsNumbers>

              <PopUpButton color='Voting' onClick={this.closeNotification}>
                ОК
              </PopUpButton>
            </>
          ) : (
            <>
              <PopUpLabel className='h1'>Никто не уходит</PopUpLabel>
              <PopUpButton color='Voting' onClick={this.goToNight}>
                Ночь
              </PopUpButton>
            </>
          )}
        </>
      );

    return (
      <>
        <ResetButton onClick={this.props.resetFn}>
          <ResetIcon size='75%' />
        </ResetButton>

        <PlayersLastMinute
          listOfPlayers={lastMinuteFor}
          killedOnLastMinute={this.killedOnLastMinute}
          goToNight={this.goToNight}
        />
      </>
    );
  };
}

export default connect(
  ({ game, players }) => ({ game, players }),
  { killPlayer, clearSelectedNumbers, changeGameState, skipVotingDec }
)(EndOfVoting);
