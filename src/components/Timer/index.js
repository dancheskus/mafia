import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Howl } from 'howler';

import { PauseIcon, ResetIcon, PlayIcon, MutedIcon } from 'icons/svgIcons';
import colors from 'style/colors';
import secondsSoundFile from 'audio/Countdown_10sec_effects.mp3';
import countdownEndFile from 'audio/Countdown_end.mp3';

import NavBarCircleButton from '../styled-components/NavBarCircleButton';
import { MutedWrapper, StartStopButton, TimeAndPlayWrapper } from './style';

const volume = 1;
const secondsSound = new Howl({ src: `${secondsSoundFile}`, volume, sprite: { oneSec: [0, 1020] } });
const countdownEndSound = new Howl({ src: `${countdownEndFile}`, volume });

export default ({ mini, time, killedOnLastMinute, autostart }) => {
  const { players, settings, game } = useSelector(state => state);
  const {
    activePlayer,
    gameState: { phase },
  } = game;

  const {
    isAlive,
    fouls: { muted },
  } = players[activePlayer];

  const defaultTimeLeft = typeof time === 'number' ? time : 60;

  const [timerWorking, setTimerWorking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(defaultTimeLeft);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft - minutes * 60;

  const startPauseTimer = () => {
    if (timeLeft === 0) return;

    if (!timerWorking) setTimeLeft(timeLeft - 1);
    setTimerWorking(!timerWorking);
  };

  const resetTimer = () => {
    setTimeLeft(defaultTimeLeft);
    setTimerWorking(false);
  };

  useEffect(() => {
    autostart && !muted && isAlive && setTimerWorking(true);
  }, [autostart, muted, isAlive]);

  useEffect(() => {
    // Остановить таймер, если игрок получил 4-й фол во время последней минуты, игрок заглушен 3-м фолом или убит 4-м фолом.
    (killedOnLastMinute || !isAlive || muted) && setTimerWorking(false);
  }, [killedOnLastMinute, isAlive, muted]);

  const timerSoundAllowed = settings.timerSounds && phase !== 'ZeroNight' && phase !== 'Night';

  useEffect(() => {
    // Звуки таймера

    if (timerSoundAllowed && timerWorking) {
      if (secondsSound) timeLeft === 10 && !secondsSound.playing() && secondsSound.play('oneSec');

      if (countdownEndSound) timeLeft === 0 && !countdownEndSound.playing() && countdownEndSound.play();
    }
  }, [timerSoundAllowed, timeLeft, timerWorking]);

  useEffect(() => {
    let interval;

    if (timeLeft === 0) setTimerWorking(false);

    if (timerWorking) {
      interval = setInterval(() => setTimeLeft(timeLeft => timeLeft - 1), 1000);
    } else if (timeLeft !== 0) clearInterval(interval);

    return () => clearInterval(interval);
  }, [timerWorking, timerSoundAllowed, timeLeft]);

  const playPauseIconColor = mini ? 'white' : timeLeft > 10 ? 'white' : '#FB6F6F';

  return (
    <>
      <TimeAndPlayWrapper mini={mini} time={timeLeft} onClick={mini && !muted ? startPauseTimer : null}>
        {time === 0 ? (
          <MutedWrapper>
            <MutedIcon size='70%' fill={colors.Day.navBarText} />
          </MutedWrapper>
        ) : (
          <>
            {killedOnLastMinute ? (
              '4 фол'
            ) : (
              <>
                {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}

                <StartStopButton mini={mini} color={phase} onClick={!mini ? startPauseTimer : null}>
                  {timerWorking ? <PauseIcon fill={playPauseIconColor} /> : <PlayIcon fill={playPauseIconColor} />}
                </StartStopButton>
              </>
            )}
          </>
        )}
      </TimeAndPlayWrapper>

      {mini && (
        <NavBarCircleButton onClick={resetTimer}>
          <ResetIcon size='70%' />
        </NavBarCircleButton>
      )}
    </>
  );
};
