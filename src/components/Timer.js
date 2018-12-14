import React, { Component, Fragment } from 'react';

export default class Timer extends Component {
  initialState = { timerWorking: false, secondsLeft: this.props.time || 60 };
  state = this.initialState;

  resetClicked = () => {
    this.stopTimer();
    this.setState({ ...this.initialState });
  };

  startPauseClicked = () => {
    if (this.state.timerWorking || this.state.secondsLeft === 0) return this.stopTimer();

    this.setState({ timerWorking: true });
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
      <Fragment>
        {`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
        <button onClick={this.startPauseClicked}>{this.state.timerWorking ? 'PAUSE' : 'START'}</button>
        <button onClick={this.resetClicked}>RESET</button>
      </Fragment>
    );
  };
}
