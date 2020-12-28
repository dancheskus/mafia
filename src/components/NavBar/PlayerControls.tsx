import React, { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import PHASE from 'common/phaseEnums';
import NavBarCircleButton from 'components/styled-components/NavBarCircleButton';
import Timer from 'components/Timer';
import { getAllAlivePlayers } from 'helpers/roleHelpers';
import usePreviousState from 'helpers/usePreviousState';
import { EyeIcon, NextIcon, ThumbUpIcon } from 'icons/svgIcons';
import { changeActivePlayer, changeGameState, skipVotingDisable } from 'redux/actions/gameActions';
import { unmutePlayer } from 'redux/actions/playersActions';
import { disableTutorial } from 'redux/actions/settingsActions';
import { gameSelector, playersSelector } from 'redux/selectors';

import { BackIcon, ButtonsWrapper } from './style';

const mod = (n: number, m: number) => ((n % m) + m) % m;

export default function PlayerControls() {
  const dispatch = useDispatch();
  const players = useSelector(playersSelector);
  const { phase } = useSelector(gameSelector).gameState;
  const { activePlayer, opensTable, selectedNumbers } = useSelector(gameSelector);

  const [stepBackAvaliable, setStepBackAvaliable] = useState(false);

  const prevPhaseState = usePreviousState(phase);
  const prevPlayersState = usePreviousState(players);

  useEffect(() => {
    setStepBackAvaliable(false);
  }, [selectedNumbers]);

  const alivePlayersCount = getAllAlivePlayers(players).length;
  const prevAlivePlayersCount = getAllAlivePlayers(prevPlayersState).length;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!stepBackAvaliable) return;

    const isPlayerDiedDuringDay = prevAlivePlayersCount !== alivePlayersCount;
    const isJustSwitchedToDay = prevPhaseState !== PHASE.DAY;
    if (isPlayerDiedDuringDay || isJustSwitchedToDay) setStepBackAvaliable(false);
  });

  // @ts-expect-error
  const findLastSpeaker = (i = opensTable - 1) => (players[mod(i, 10)].isAlive ? mod(i, 10) : findLastSpeaker(i - 1));

  const toVotingClicked = () => {
    batch(() => {
      dispatch(disableTutorial());

      if (selectedNumbers.length) return dispatch(changeGameState({ phase: PHASE.VOTING }));

      dispatch(skipVotingDisable());
      dispatch(changeGameState({ phase: PHASE.NIGHT }));
    });
  };

  const goToNextAlivePlayer = (i = activePlayer + 1) => {
    batch(() => {
      dispatch(unmutePlayer(mod(i - 1, 10)));
      players[mod(i, 10)].isAlive ? dispatch(changeActivePlayer(mod(i, 10))) : goToNextAlivePlayer(i + 1);
    });
    setStepBackAvaliable(true);
  };

  const goToPreviousAlivePlayer = (i = activePlayer - 1) => {
    players[mod(i, 10)].isAlive ? dispatch(changeActivePlayer(mod(i, 10))) : goToPreviousAlivePlayer(i - 1);
    setStepBackAvaliable(false);
  };

  const lastSpeaker = activePlayer === findLastSpeaker();

  return (
    <ButtonsWrapper className='day-user-navigation'>
      <NavBarCircleButton
        disabled={!stepBackAvaliable}
        onClick={() => (stepBackAvaliable ? goToPreviousAlivePlayer() : null)}
      >
        <BackIcon size='50%' />
      </NavBarCircleButton>

      <Timer
        time={players[activePlayer].fouls.muted && (alivePlayersCount === 3 || alivePlayersCount === 4 ? 30 : 0)}
        autostart={activePlayer !== opensTable}
        mini
        key={activePlayer}
      />

      <NavBarCircleButton onClick={lastSpeaker ? toVotingClicked : () => goToNextAlivePlayer()}>
        {lastSpeaker ? (
          selectedNumbers.length === 0 ? (
            <EyeIcon size='50%' />
          ) : (
            <ThumbUpIcon size='50%' />
          )
        ) : (
          <NextIcon size='50%' />
        )}
      </NavBarCircleButton>
    </ButtonsWrapper>
  );
}
