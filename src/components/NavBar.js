import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { countBy } from 'lodash';

import { changeActivePlayer, changeGameState, skipVotingDec } from 'redux/actions/gameActions';
import { unmutePlayer } from 'redux/actions/playersActions';
import { disableTutorial } from '../redux/actions/settingsActions';
import NavMenu from './NavMenu';
import colors from '../colors';
import NavBarCircleButton from './styled-components/NavBarCircleButton';
import { NextIcon, ThumbUpIcon, EyeIcon } from 'icons/svgIcons';
import Timer from './Timer';
import AudioPlayer from './AudioPlayer';

const BackIcon = styled(NextIcon)`
  transform: rotate(180deg);
`;

const StyledNavigation = styled.div`
  background: #46494e;
  ${({ tutorialEnabled }) => !tutorialEnabled && 'z-index: 300'}

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

  span {
    ${({ tutorialEnabled }) => tutorialEnabled && 'animation: zoom 1s alternate ease-in 2;'}
  }

  @keyframes zoom {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

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

  > div:not(:first-child) {
    margin-left: 15px;
  }
`;

const mod = (n, m) => ((n % m) + m) % m;

class Navigation extends Component {
  state = { stepBackAvaliable: false };

  componentDidUpdate = prevState => {
    if (prevState.game.gameState.phase !== 'Day' && this.state.stepBackAvaliable)
      this.setState({ stepBackAvaliable: false });

    // Если стало меньше живых игроков, выключить кнопку "назад"
    const prevAllAlivePlayers = countBy(prevState.players.map(player => player.isAlive)).true;
    const allAlivePlayers = countBy(this.props.players.map(player => player.isAlive)).true;
    if (prevAllAlivePlayers !== allAlivePlayers) this.setState({ stepBackAvaliable: false });
  };

  goToNextAlivePlayer = (i = this.props.game.activePlayer + 1) => {
    this.props.unmutePlayer(mod(i - 1, 10));

    this.props.players[mod(i, 10)].isAlive
      ? this.props.changeActivePlayer(mod(i, 10))
      : this.goToNextAlivePlayer(i + 1);

    this.setState({ stepBackAvaliable: true });
  };

  findLastSpeaker = (i = this.props.game.opensTable - 1) =>
    this.props.players[mod(i, 10)].isAlive ? mod(i, 10) : this.findLastSpeaker(i - 1);

  goToPreviousAlivePlayer = (i = this.props.game.activePlayer - 1) => {
    this.props.players[mod(i, 10)].isAlive
      ? this.props.changeActivePlayer(mod(i, 10))
      : this.goToPreviousAlivePlayer(i - 1);

    this.setState({ stepBackAvaliable: false });
  };

  toVotingClicked = () => {
    this.props.disableTutorial();

    if (this.props.game.selectedNumbers.length) return this.props.changeGameState({ phase: 'Voting' });

    this.props.skipVotingDec();
    this.props.changeGameState({ phase: 'Night' });
  };

  render = () => {
    const { phase } = this.props.game.gameState;
    const { dayNumber } = this.props.game.gameState;
    let title = '';
    if (phase === 'SeatAllocator') title = 'раздача номеров';
    if (phase === 'RoleDealing') title = 'раздача ролей';
    if (phase === 'ZeroNight') title = '0 ночь';
    if (phase === 'Day') title = `${dayNumber} день`;
    if (phase === 'Voting') title = 'Голосование';
    if (phase === 'Night') title = `${dayNumber} Ночь`;
    if (phase === 'EndOfGame') title = `Конец игры`;

    const lastSpeaker = this.props.game.activePlayer === this.findLastSpeaker();

    const alivePlayers = this.props.players.filter(x => x.isAlive).length;

    const { stepBackAvaliable } = this.state;

    const { tutorialEnabled } = this.props.settings;

    return (
      <StyledNavigation color={phase} tutorialEnabled={tutorialEnabled}>
        <Container className="d-flex justify-content-between p-0">
          <NavStateName tutorialEnabled={tutorialEnabled} key={title}>
            <span>{title}</span>
          </NavStateName>

          {phase === 'Day' && (
            <ButtonsWrapper className="day-user-navigation">
              <NavBarCircleButton
                disabled={!stepBackAvaliable}
                onClick={() => (stepBackAvaliable ? this.goToPreviousAlivePlayer() : null)}
              >
                <BackIcon size="50%" />
              </NavBarCircleButton>

              <Timer
                time={
                  this.props.players[this.props.game.activePlayer].fouls.muted
                    ? alivePlayers === 3 || alivePlayers === 4
                      ? 30
                      : 0
                    : 60
                }
                autostart={this.props.game.activePlayer !== this.props.game.opensTable}
                mini
                key={this.props.game.activePlayer}
              />

              <NavBarCircleButton onClick={lastSpeaker ? this.toVotingClicked : () => this.goToNextAlivePlayer()}>
                {lastSpeaker ? (
                  this.props.game.selectedNumbers.length === 0 ? (
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

          {this.props.settings.appMusic && (
            <ButtonsWrapper
              style={{ display: phase !== 'Night' && phase !== 'ZeroNight' && phase !== 'RoleDealing' && 'none' }}
            >
              {phase !== 'SeatAllocator' && <AudioPlayer />}
            </ButtonsWrapper>
          )}

          <NavMenu />
        </Container>
      </StyledNavigation>
    );
  };
}

export default connect(
  ({ game, players, settings }) => ({ game, players, settings }),
  { changeActivePlayer, changeGameState, unmutePlayer, skipVotingDec, disableTutorial }
)(Navigation);
