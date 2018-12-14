import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { PauseIcon, ResetIcon, PlayIcon } from '../img/svgIcons';
import colors from '../colors';

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 400%;
  color: white;
`;

const StartStopButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => colors[props.color].popupButton};
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ResetButton = styled.div``;

class Timer extends Component {
  initialState = { timerWorking: false, secondsLeft: this.props.time || 60 };
  state = this.initialState;

  resetClicked = () => {
    this.stopTimer();
    this.setState({ ...this.initialState });
  };

  startPauseClicked = () => {
    if (this.state.timerWorking || this.state.secondsLeft === 0) return this.stopTimer();

    this.setState({ timerWorking: true, secondsLeft: this.state.secondsLeft - 1 });

    this.timer = setInterval(() => {
      this.setState({ secondsLeft: this.state.secondsLeft - 1 });
      if (this.state.secondsLeft === 0) this.stopTimer();
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerWorking: false });
  };

  render = () => {
    const time = this.state.secondsLeft;
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return (
      <TimerWrapper>
        {`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
        <StartStopButton color={this.props.game.gameState.phase} onClick={this.startPauseClicked}>
          {this.state.timerWorking ? <PauseIcon size={'80%'} /> : <PlayIcon size={'80%'} />}
        </StartStopButton>
        {/* <button onClick={this.resetClicked}>
          <ResetIcon size={'80%'}  />
        </button> */}
      </TimerWrapper>
    );
  };
}

const mapStateToProps = ({ game }) => ({ game });

export default connect(mapStateToProps)(Timer);
