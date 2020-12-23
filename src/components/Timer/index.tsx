import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Howl } from 'howler';
import { useTimer } from 'use-timer';

// @ts-expect-error
import countdownEndFile from 'audio/Countdown_end.mp3';
// @ts-expect-error
import secondsSoundFile from 'audio/Countdown_10sec_effects.mp3';
import { PauseIcon, ResetIcon, PlayIcon, MutedIcon } from 'icons/svgIcons';
import colors from 'style/colors';
import { gameSelector, playersSelector, settingsSelector } from 'redux/selectors';
import PHASE from 'common/phaseEnums';

import NavBarCircleButton from '../styled-components/NavBarCircleButton';
import { MutedWrapper, StartStopButton, TimeAndPlayWrapper } from './style';

const secondsSound = new Howl({ src: `${secondsSoundFile}`, sprite: { oneSec: [0, 1020] } });
const countdownEndSound = new Howl({ src: `${countdownEndFile}` });

interface Props {
  mini?: boolean;
  time?: number | false;
  killedOnLastMinute?: boolean;
  autostart?: boolean;
}

export default function Timer({ mini, time: initialTime, killedOnLastMinute, autostart }: Props) {
  const players = useSelector(playersSelector);
  const settings = useSelector(settingsSelector);
  const {
    activePlayer,
    gameState: { phase },
  } = useSelector(gameSelector);

  const {
    isAlive,
    fouls: { muted },
  } = players[activePlayer];

  const [timerWorking, setTimerWorking] = useState(!!(autostart && !muted && isAlive));
  const timerSoundAllowed = settings.timerSounds && phase !== PHASE.ZERONIGHT && phase !== PHASE.NIGHT;

  const { time, start: timerStart, pause: timerPause, reset: timerReset, advanceTime } = useTimer({
    initialTime: typeof initialTime === 'number' ? initialTime : 60,
    endTime: 0,
    timerType: 'DECREMENTAL',
    autostart: timerWorking,
    onTimeOver: () => setTimerWorking(false),
    onTimeUpdate: seconds => {
      // Звуки таймера
      if (!timerSoundAllowed) return;

      seconds === 10 && !secondsSound.playing() && secondsSound.play('oneSec');
      seconds === 0 && !countdownEndSound.playing() && countdownEndSound.play();
    },
  });

  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  const toggleTimer = () => {
    if (time === 0) return;

    setTimerWorking(!timerWorking);

    if (timerWorking) {
      timerPause();
    } else {
      timerStart();
      advanceTime(1);
    }
  };

  const resetTimer = () => {
    timerReset();
    setTimerWorking(false);
  };

  useEffect(() => {
    // Остановить таймер, если игрок получил 4-й фол во время последней минуты, игрок заглушен 3-м фолом или убит 4-м фолом.
    if (killedOnLastMinute || !isAlive || muted) {
      timerPause();
      setTimerWorking(false);
    }
  }, [killedOnLastMinute, isAlive, muted, timerPause]);

  const playPauseIconColor = mini ? 'white' : time > 10 ? 'white' : '#FB6F6F';

  return (
    <>
      <TimeAndPlayWrapper mini={mini} time={time} onClick={mini && !muted ? toggleTimer : undefined}>
        {initialTime === 0 ? (
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

                <StartStopButton mini={mini} onClick={!mini ? toggleTimer : undefined}>
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
}
