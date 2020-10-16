import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Howl } from 'howler';

import { PauseIcon, ResetIcon, PlayIcon, MutedIcon } from 'icons/svgIcons';
import colors from 'style/colors';
import secondsSoundFile from 'audio/Countdown_10sec_effects.mp3';
import countdownEndFile from 'audio/Countdown_end.mp3';

import { Muted, StartStopButton, TimeAndPlayWrapper } from './style';

import NavBarCircleButton from '../styled-components/NavBarCircleButton';

const volume = 1;
const secondsSound = new Howl({ src: `${secondsSoundFile}`, volume, sprite: { oneSec: [0, 1020] } });
const countdownEndSound = new Howl({ src: `${countdownEndFile}`, volume });

export default ({ mini, time, killedOnLastMinute, autostart }) => {
  const {
    players,
    settings,
    game: {
      activePlayer,
      gameState: { phase },
    },
  } = useSelector(state => state);

  const defaultTimeLeft = time || 60;
  const [timerWorking, setTimerWorking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(defaultTimeLeft);
  const playerMuted = players[activePlayer].fouls.muted;

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
    autostart && !playerMuted && setTimerWorking(true);
  }, [autostart, playerMuted]);

  useEffect(() => {
    // Остановить таймер, если игрок получил 4-й фол во время последней минуты.
    killedOnLastMinute && setTimerWorking(false);
  }, [killedOnLastMinute]);

  const timerSoundAllowed = settings.timerSounds && phase !== 'ZeroNight' && phase !== 'Night' && timerWorking;

  useEffect(() => {
    let interval;

    if (timerWorking) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          const newTimeLeft = timeLeft - 1;

          if (newTimeLeft === 0) setTimerWorking(false);

          if (timerSoundAllowed) {
            if (secondsSound) newTimeLeft === 10 && !secondsSound.playing() && secondsSound.play('oneSec');

            if (countdownEndSound) newTimeLeft === 0 && !countdownEndSound.playing() && countdownEndSound.play();
          }

          return newTimeLeft;
        });
      }, 1000);
    } else if (seconds !== 0) clearInterval(interval);

    return () => clearInterval(interval);
  }, [timerWorking, seconds, timerSoundAllowed]);

  const playPauseIconColor = mini ? 'white' : timeLeft > 10 ? 'white' : '#FB6F6F';

  return (
    <>
      <TimeAndPlayWrapper mini={mini} time={timeLeft} onClick={mini && !playerMuted ? startPauseTimer : null}>
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
