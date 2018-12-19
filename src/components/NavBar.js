import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { changeActivePlayer, changeGameState } from '../redux/actions/gameActions';

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

  const nextClicked = () => {
    props.changeActivePlayer(props.game.activePlayer === 10 ? 1 : props.game.activePlayer + 1);
  };

  const toVotingClicked = () => {
    props.changeGameState({ phase: 'Voting' });
  };

  const lastSpeaker =
    props.game.opensTable - props.game.activePlayer === 1 || props.game.opensTable - props.game.activePlayer === -9;

  return (
    <StyledNavigation color={phase}>
      <Container className="d-flex justify-content-between p-0">
        <NavStateName>{title}</NavStateName>
        {phase !== 'SeatAllocator' && phase !== 'RoleDealing' && phase !== 'ZeroNight' && (
          <ButtonsWrapper>
            <Timer mini key={props.game.activePlayer} />
            <NavBarCircleButton onClick={lastSpeaker ? toVotingClicked : nextClicked}>
              {lastSpeaker ? <ThumbUpIcon size="50%" /> : <NextIcon size="50%" />}
            </NavBarCircleButton>
          </ButtonsWrapper>
        )}

        <NavMenu />
      </Container>
    </StyledNavigation>
  );
};

const mapStateToProps = ({ game }) => ({ game });
const mapDispatchToProps = dispatch => ({
  changeActivePlayer: playerNumber => dispatch(changeActivePlayer(playerNumber)),
  changeGameState: payload => dispatch(changeGameState(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
