import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { changeActivePlayer, changeGameState } from '../redux/actions/gameActions';
import _ from 'lodash';

import NavMenu from './NavMenu';
import colors from '../colors';
import NavBarCircleButton from './style/NavBarCircleButton';
import { NextIcon, ThumbUpIcon } from '../img/svgIcons';
import Timer from './Timer';

const StyledNavigation = styled.div`
  background: #46494e;

  .container > * {
    padding: 10px;
    color: ${props => colors[props.color].navBarText};
    display: flex;
    justify-content: center;
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
`;

const ButtonsWrapper = styled.div`
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Navigation = props => {
  const phase = props.game.gameState.phase;
  const dayNumber = props.game.gameState.dayNumber;
  let title = '';
  if (phase === 'SeatAllocator') title = 'раздача номеров';
  if (phase === 'RoleDealing') title = 'раздача ролей';
  if (phase === 'ZeroNight') title = '0 ночь';
  if (phase === 'Day') title = `${dayNumber} день`;
  if (phase === 'Voting') title = 'Голосование';

  const lastSpeaker =
    props.game.opensTable - props.game.activePlayer === 1 || props.game.opensTable - props.game.activePlayer === -9;

  const nextPlayer = i => (props.players[(i + 1) % 10].isAlive ? (i + 1) % 10 : nextPlayer((i + 1) % 10));

  // const nextPlayer = () => {
  //   let nextPlayer = props.game.activePlayer + 1;

  //   while (!props.players[nextPlayer - 1].isAlive) {
  //     nextPlayer++;
  //     if (nextPlayer === 11) nextPlayer = 1;
  //   }

  //   return nextPlayer;
  // };

  // const nextClicked = () => {
  //   // const alivePlayersBeforeOpener = _.filter(
  //   //   props.players,
  //   //   (player, i) => player.isAlive && i < props.game.opensTable - 1
  //   // );

  //   // console.log(alivePlayersBeforeOpener);
  //   const allPlayers = props.players;
  //   const activePlayer = props.game.activePlayer;
  //   const lastAlivePlayer = _.findLastIndex(allPlayers, player => player.isAlive) + 1;
  //   const searchFromIndex = activePlayer < lastAlivePlayer ? activePlayer : 0;
  //   const nextPlayer = _.findIndex(allPlayers, player => player.isAlive, searchFromIndex) + 1;

  //   // if (nextPlayer === props.game.opensTable) return toVotingClicked();
  //   props.changeActivePlayer(nextPlayer);
  // };

  const toVotingClicked = () => {
    props.changeGameState({ phase: 'Voting' });
  };

  return (
    <StyledNavigation color={phase}>
      <Container className="d-flex justify-content-between p-0">
        <NavStateName>{title}</NavStateName>
        {phase !== 'SeatAllocator' && phase !== 'RoleDealing' && phase !== 'ZeroNight' && (
          <ButtonsWrapper>
            <Timer mini key={props.game.activePlayer} />
            {/* <NavBarCircleButton onClick={lastSpeaker ? toVotingClicked : nextClicked}> */}
            <NavBarCircleButton onClick={() => props.changeActivePlayer(nextPlayer(props.game.activePlayer))}>
              {lastSpeaker ? <ThumbUpIcon size="50%" /> : <NextIcon size="50%" />}
            </NavBarCircleButton>
          </ButtonsWrapper>
        )}

        <NavMenu />
      </Container>
    </StyledNavigation>
  );
};

const mapStateToProps = ({ game, players }) => ({ game, players });
const mapDispatchToProps = dispatch => ({
  changeActivePlayer: playerNumber => dispatch(changeActivePlayer(playerNumber)),
  changeGameState: payload => dispatch(changeGameState(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
