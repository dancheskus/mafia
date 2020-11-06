import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { batch, useDispatch, useSelector } from 'react-redux';
import { countBy } from 'lodash';

import NavMenu from 'components/NavMenu';
import { changeActivePlayer, changeGameState, skipVotingDisable } from 'redux/actions/gameActions';
import { unmutePlayer } from 'redux/actions/playersActions';
import { NextIcon, ThumbUpIcon, EyeIcon } from 'icons/svgIcons';
import { disableTutorial } from 'redux/actions/settingsActions';
import NavBarCircleButton from 'components/styled-components/NavBarCircleButton';
import usePreviousState from 'helpers/usePreviousState';
import Timer from 'components/Timer';
import { gameSelector, playersSelector, settingsSelector } from 'redux/selectors';

import AudioPlayer from './AudioPlayer';
import { BackIcon, ButtonsWrapper, NavStateName, StyledNavigation } from './style';

const mod = (n, m) => ((n % m) + m) % m;

export default () => {
  const dispatch = useDispatch();
  const players = useSelector(playersSelector);
  const { tutorialEnabled, appMusic } = useSelector(settingsSelector);
  const {
    gameState: { phase, dayNumber },
    activePlayer,
    opensTable,
    selectedNumbers,
  } = useSelector(gameSelector);

  const [stepBackAvaliable, setStepBackAvaliable] = useState(false);

  const prevPhaseState = usePreviousState(phase);
  const prevPlayersState = usePreviousState(players);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (prevPhaseState !== 'Day' && stepBackAvaliable) setStepBackAvaliable(false);

    // Если стало меньше живых игроков, выключить кнопку "назад"
    const prevAllAlivePlayers = countBy(prevPlayersState?.map(({ isAlive }) => isAlive)).true;
    const allAlivePlayers = countBy(players.map(({ isAlive }) => isAlive)).true;
    if (prevAllAlivePlayers !== allAlivePlayers) setStepBackAvaliable(false);
  });

  const goToNextAlivePlayer = (i = activePlayer + 1) => {
    batch(() => {
      dispatch(unmutePlayer(mod(i - 1, 10)));
      players[mod(i, 10)].isAlive ? dispatch(changeActivePlayer(mod(i, 10))) : goToNextAlivePlayer(i + 1);
    });
    setStepBackAvaliable(true);
  };

  const findLastSpeaker = (i = opensTable - 1) => (players[mod(i, 10)].isAlive ? mod(i, 10) : findLastSpeaker(i - 1));

  const goToPreviousAlivePlayer = (i = activePlayer - 1) => {
    players[mod(i, 10)].isAlive ? dispatch(changeActivePlayer(mod(i, 10))) : goToPreviousAlivePlayer(i - 1);
    setStepBackAvaliable(false);
  };

  const toVotingClicked = () => {
    batch(() => {
      dispatch(disableTutorial());

      if (selectedNumbers.length) return dispatch(changeGameState({ phase: 'Voting' }));

      dispatch(skipVotingDisable());
      dispatch(changeGameState({ phase: 'Night' }));
    });
  };

  const phaseTitles = {
    SeatAllocator: 'раздача номеров',
    RoleDealing: 'раздача ролей',
    ZeroNight: '0 ночь',
    Day: `${dayNumber} день`,
    Voting: 'Голосование',
    Night: `${dayNumber} Ночь`,
    EndOfGame: `Конец игры`,
  };
  const currentPhaseTitle = phaseTitles[phase];

  const lastSpeaker = activePlayer === findLastSpeaker();

  const alivePlayers = players.filter(x => x.isAlive).length;

  return (
    <StyledNavigation color={phase} tutorialEnabled={tutorialEnabled}>
      <Container className='d-flex justify-content-between p-0'>
        <NavStateName tutorialEnabled={tutorialEnabled} key={currentPhaseTitle}>
          <span>{currentPhaseTitle}</span>
        </NavStateName>

        {phase === 'Day' && (
          <ButtonsWrapper className='day-user-navigation'>
            <NavBarCircleButton
              disabled={!stepBackAvaliable}
              onClick={() => (stepBackAvaliable ? goToPreviousAlivePlayer() : null)}
            >
              <BackIcon size='50%' />
            </NavBarCircleButton>

            <Timer
              time={players[activePlayer].fouls.muted && (alivePlayers === 3 || alivePlayers === 4 ? 30 : 0)}
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
        )}

        {appMusic && (
          <ButtonsWrapper
            style={{
              ...(phase !== 'Night' && phase !== 'ZeroNight' && phase !== 'RoleDealing' && { display: 'none' }),
            }}
          >
            {phase !== 'SeatAllocator' && <AudioPlayer />}
          </ButtonsWrapper>
        )}

        <NavMenu />
      </Container>
    </StyledNavigation>
  );
};
