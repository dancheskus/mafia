import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import { changeActivePlayer, changeGameState, skipVotingDec } from 'redux/actions/gameActions';
import { unmutePlayer } from 'redux/actions/playersActions';
import { disableTutorial } from '../redux/actions/settingsActions';
import NavMenu from './NavMenu';
import colors from '../colors';
import NavBarCircleButton from './styled-components/NavBarCircleButton';
import { NextIcon, ThumbUpIcon, EyeIcon } from 'icons/svgIcons';
import Timer from './Timer';
import AudioPlayer from './AudioPlayer';

const StyledNavigation = styled.div`
  background: #46494e;
  z-index: 300;

  .container > * {
    padding: 10px;
    color: ${props => colors[props.color].navBarText};
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;

    &:not(:last-child) {
      border-right: 2px solid #8f8f8f;
      flex-grow: 1;
    }
  }
`;

const NavStateName = styled.h2`
  margin: 0;
  font-weight: 300;
  font-size: 2rem;
  text-transform: uppercase;

  @media (max-width: 520px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.3rem;
  }
`;

const ButtonsWrapper = styled.div`
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const mod = (n, m) => ((n % m) + m) % m;

const Navigation = props => {
  const phase = props.game.gameState.phase;
  const dayNumber = props.game.gameState.dayNumber;
  let title = '';
  if (phase === 'SeatAllocator') title = 'раздача номеров';
  if (phase === 'RoleDealing') title = 'раздача ролей';
  if (phase === 'ZeroNight') title = '0 ночь';
  if (phase === 'Day') title = `${dayNumber} день`;
  if (phase === 'Voting') title = 'Голосование';
  if (phase === 'Night') title = `${dayNumber} Ночь`;
  if (phase === 'EndOfGame') title = `Конец игры`;

  const findLastSpeaker = (i = props.game.opensTable - 1) =>
    props.players[mod(i, 10)].isAlive ? mod(i, 10) : findLastSpeaker(i - 1);

  const lastSpeaker = props.game.activePlayer === findLastSpeaker();

  const goToNextAlivePlayer = (i = props.game.activePlayer + 1) => {
    props.unmutePlayer(mod(i - 1, 10));
    props.players[mod(i, 10)].isAlive ? props.changeActivePlayer(mod(i, 10)) : goToNextAlivePlayer(i + 1);
  };

  const toVotingClicked = () => {
    props.disableTutorial();

    if (props.game.selectedNumbers.length) return props.changeGameState({ phase: 'Voting' });

    props.skipVotingDec();
    props.changeGameState({ phase: 'Night' });
  };
  const alivePlayers = props.players.filter(x => x.isAlive).length;

  return (
    <StyledNavigation color={phase}>
      <Container className="d-flex justify-content-between p-0">
        <NavStateName>{title}</NavStateName>

        {phase === 'Day' && (
          <ButtonsWrapper>
            <Timer
              time={
                props.players[props.game.activePlayer].fouls.muted
                  ? alivePlayers === 3 || alivePlayers === 4
                    ? 30
                    : 0
                  : 60
              }
              autostart={props.game.activePlayer !== props.game.opensTable}
              mini
              key={props.game.activePlayer}
            />
            <NavBarCircleButton onClick={lastSpeaker ? toVotingClicked : () => goToNextAlivePlayer()}>
              {lastSpeaker ? (
                props.game.selectedNumbers.length === 0 ? (
                  <EyeIcon size="50%" />
                ) : (
                  <ThumbUpIcon size="50%" />
                )
              ) : (
                <NextIcon size="50%" />
              )}
            </NavBarCircleButton>
          </ButtonsWrapper>
        )}

        {props.settings.appMusic && (
          <ButtonsWrapper
            style={{ display: phase !== 'Night' && phase !== 'ZeroNight' && phase !== 'RoleDealing' && 'none' }}
          >
            <AudioPlayer />
          </ButtonsWrapper>
        )}

        <NavMenu />
      </Container>
    </StyledNavigation>
  );
};

export default connect(
  ({ game, players, settings }) => ({ game, players, settings }),
  { changeActivePlayer, changeGameState, unmutePlayer, skipVotingDec, disableTutorial }
)(Navigation);
