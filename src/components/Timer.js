import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { PauseIcon, ResetIcon, PlayIcon, MutedIcon } from 'icons/svgIcons';
import colors from 'colors.js';
import NavBarCircleButton from './styled-components/NavBarCircleButton';

const TimeAndPlayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 1;

  ${props =>
    props.mini
      ? `
          width: 45px;
          min-height: 45px;
          cursor: pointer;
          background: ${colors.Day.deadPlayerCardNumber};
          border-radius: 5px; 
        `
      : `
          font-size: 400%;
          color: ${props.time > 10 ? 'white' : '#FB6F6F'};

          @media (max-height: 630px) {
            font-size: 300%;
          }
      `};
`;

const StartStopButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    !props.mini
      ? `
      background: ${props => colors[props.color].popupButton};
      /* border-radius: 50%; Вроде не используется */
      height: 15%;
      width: 15%;

      @media (max-height: 630px) {
        height: 12%;
        width: 12%;
      }
    `
      : `
      height: 40%;
      width: 40%;
    `}
`;

const Muted = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Timer extends Component {
  initialState = { timerWorking: false, secondsLeft: this.props.time || 60 };
  state = this.initialState;

  componentDidMount = () => {
    this.props.autostart && this.startPauseClicked();
  };
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
        <TimeAndPlayWrapper mini={isMini} time={time} onClick={isMini ? this.startPauseClicked : null}>
          {this.props.time === 0 ? (
            <Muted>
              <MutedIcon size="70%" fill={colors.Day.navBarText} />
            </Muted>
          ) : (
            <>
              {this.props.killedOnLastMinute ? (
                '4 фол'
              ) : (
                <>
                  {`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}
                  <StartStopButton
                    mini={isMini}
                    color={this.props.game.gameState.phase}
                    onClick={!isMini ? this.startPauseClicked : null}
                  >
                    {this.state.timerWorking ? (
                      <PauseIcon fill={isMini ? 'white' : time > 10 ? 'white' : '#FB6F6F'} />
                    ) : (
                      <PlayIcon fill={isMini ? 'white' : time > 10 ? 'white' : '#FB6F6F'} />
                    )}
                  </StartStopButton>
                </>
              )}
            </>
          )}
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

export default connect(({ game }) => ({ game }))(Timer);
