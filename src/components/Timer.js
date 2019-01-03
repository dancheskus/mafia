import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { PauseIcon, ResetIcon, PlayIcon } from 'icons/svgIcons';
import colors from '../colors';
import NavBarCircleButton from './style/NavBarCircleButton';

const TimeAndPlayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${props =>
    props.mini
      ? `width: 45px;
      cursor: pointer;
      background: ${colors.Day.deadPlayerCardNumber};
      border-radius: 5px;`
      : `font-size: 400%;
      color: white;`}
`;

const StartStopButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    !props.mini &&
    `
  background: ${props => colors[props.color].popupButton};
  width: 50px;
  height: 50px;
  border-radius: 50%;
      `}
`;

class Timer extends Component {
  initialState = { timerWorking: false, secondsLeft: this.props.time || 60 };
  state = this.initialState;

  componentWillUnmount = () => this.stopTimer();

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
    const isMini = this.props.mini;

    return (
      <>
        <TimeAndPlayWrapper mini={isMini} onClick={isMini ? this.startPauseClicked : null}>
          {`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
          <StartStopButton
            mini={isMini}
            color={this.props.game.gameState.phase}
            onClick={!isMini ? this.startPauseClicked : null}
          >
            {this.state.timerWorking ? (
              <PauseIcon size={isMini ? '35%' : '80%'} />
            ) : (
              <PlayIcon size={isMini ? '35%' : '80%'} />
            )}
          </StartStopButton>
        </TimeAndPlayWrapper>

        {isMini && (
          <NavBarCircleButton onClick={this.resetClicked}>
            <ResetIcon size={'70%'} />
          </NavBarCircleButton>
        )}
      </>
    );
  };
}

const mapStateToProps = ({ game }) => ({ game });

export default connect(mapStateToProps)(Timer);
