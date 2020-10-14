import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Howl } from 'howler';

import { PauseIcon, ResetIcon, PlayIcon, MutedIcon } from 'icons/svgIcons';
import colors from 'colors.js';
import NavBarCircleButton from './styled-components/NavBarCircleButton';
import secondsSoundFile from '../audio/Countdown_10sec_effects.mp3';
import countdownEndFile from '../audio/Countdown_end.mp3';

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
      height: 40px;
      width: 40px;

      @media (max-height: 630px) {
        height: 35px;
        width: 35px;
      }
    `
      : `
      height: 20px;
      width: 20px;
    `}
`;

const Muted = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Timer extends Component {
  initialState = {
    timerWorking: false,
    secondsLeft: this.props.time || 60,
    playerMuted: this.props.players[this.props.game.activePlayer].fouls.muted,
  };

  state = this.initialState;

  componentDidMount = () => {
    this.props.autostart && !this.state.playerMuted && this.startPauseClicked();

    const volume = 1;

    this.secondsSound = new Howl({
      src: `${secondsSoundFile}`,
      volume,
      sprite: { oneSec: [0, 1020] },
    });

    this.countdownEndSound = new Howl({ src: `${countdownEndFile}`, volume });
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

    this.secondsSound && this.secondsSound.stop();
  };

  render = () => {
    const { phase } = this.props.game.gameState;
    const timerSoundAllowed =
      this.props.settings.timerSounds && phase !== 'ZeroNight' && phase !== 'Night' && this.state.timerWorking;
    const time = this.state.secondsLeft;
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    const isMini = this.props.mini;

    if (timerSoundAllowed) {
      const { secondsSound, countdownEndSound } = this;

      if (secondsSound) seconds === 10 && !secondsSound.playing() && secondsSound.play('oneSec');

      if (countdownEndSound) seconds === 0 && !countdownEndSound.playing() && countdownEndSound.play();
    }

    return (
      <>
        <TimeAndPlayWrapper
          mini={isMini}
          time={time}
          onClick={isMini && !this.state.playerMuted ? this.startPauseClicked : null}
        >
          {this.props.time === 0 ? (
            <Muted>
              <MutedIcon size='70%' fill={colors.Day.navBarText} />
            </Muted>
          ) : (
            <>
              {this.props.killedOnLastMinute ? (
                '4 фол'
              ) : (
                <>
                  {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                  <StartStopButton mini={isMini} color={phase} onClick={!isMini ? this.startPauseClicked : null}>
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
            <ResetIcon size='70%' />
          </NavBarCircleButton>
        )}
      </>
    );
  };
}

export default connect(({ game, settings, players }) => ({ game, settings, players }))(Timer);
