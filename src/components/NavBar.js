import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import NavMenu from './NavMenu';
import colors from '../colors';

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

const NavTimer = styled.div`
  /*  */
`;

const Navigation = props => {
  const phase = props.game.gameState.phase;
  const dayNumber = props.game.gameState.dayNumber;
  let title = '';
  if (phase === 'SeatAllocator') title = 'раздача номеров';
  if (phase === 'RoleDealing') title = 'раздача ролей';
  if (phase === 'ZeroNight') title = '0 ночь';
  if (phase === 'Day') title = `${dayNumber} день`;

  return (
    <StyledNavigation color={phase}>
      <Container className="d-flex justify-content-between p-0">
        <NavStateName>{title}</NavStateName>
        {phase !== 'SeatAllocator' && phase !== 'RoleDealing' && phase !== 'ZeroNight' && <NavTimer>1:00</NavTimer>}
        <NavMenu />
      </Container>
    </StyledNavigation>
  );
};

const mapStateToProps = ({ game }) => ({ game });
export default connect(mapStateToProps)(Navigation);
