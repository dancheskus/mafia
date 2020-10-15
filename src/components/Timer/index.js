import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Howl } from 'howler';

import { PauseIcon, ResetIcon, PlayIcon, MutedIcon } from 'icons/svgIcons';
import colors from 'style/colors';
import secondsSoundFile from 'audio/Countdown_10sec_effects.mp3';
import countdownEndFile from 'audio/Countdown_end.mp3';
import NavBarCircleButton from '../styled-components/NavBarCircleButton';
import { Muted, StartStopButton, TimeAndPlayWrapper } from './style';

class Timer extends Component {
  initialState = {
    timerWorking: false,
    timeLeft: this.props.time || 60,
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
    if (this.state.timerWorking || this.state.timeLeft === 0) return this.stopTimer();

    this.setState({ timerWorking: true, timeLeft: this.state.timeLeft - 1 });

    this.timer = setInterval(() => {
      this.setState({ timeLeft: this.state.timeLeft - 1 });
      if (this.state.timeLeft === 0) this.stopTimer();
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerWorking: false });

    this.secondsSound && this.secondsSound.stop();
  };

  render = () => {
    const {
      game: {
        gameState: { phase },
      },
      settings,
      mini,
      time,
      killedOnLastMinute,
    } = this.props;

    const { timerWorking, timeLeft, playerMuted } = this.state;

    const timerSoundAllowed = settings.timerSounds && phase !== 'ZeroNight' && phase !== 'Night' && timerWorking;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;

    if (timerSoundAllowed) {
      const { secondsSound, countdownEndSound } = this;

      if (secondsSound) seconds === 10 && !secondsSound.playing() && secondsSound.play('oneSec');

      if (countdownEndSound) seconds === 0 && !countdownEndSound.playing() && countdownEndSound.play();
    }

    const playPauseIconColor = mini ? 'white' : timeLeft > 10 ? 'white' : '#FB6F6F';

    return (
      <>
        <TimeAndPlayWrapper mini={mini} time={timeLeft} onClick={mini && !playerMuted ? this.startPauseClicked : null}>
          {time === 0 ? (
            <Muted>
              <MutedIcon size='70%' fill={colors.Day.navBarText} />
            </Muted>
          ) : (
            <>
              {killedOnLastMinute ? (
                '4 фол'
              ) : (
                <>
                  {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}

                  <StartStopButton mini={mini} color={phase} onClick={!mini ? this.startPauseClicked : null}>
                    {timerWorking ? <PauseIcon fill={playPauseIconColor} /> : <PlayIcon fill={playPauseIconColor} />}
                  </StartStopButton>
                </>
              )}
            </>
          )}
        </TimeAndPlayWrapper>

        {mini && (
          <NavBarCircleButton onClick={this.resetClicked}>
            <ResetIcon size='70%' />
          </NavBarCircleButton>
        )}
      </>
    );
  };
}

export default connect(({ game, settings, players }) => ({ game, settings, players }))(Timer);
