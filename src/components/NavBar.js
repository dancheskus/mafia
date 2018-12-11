import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import NavMenu from './NavMenu/index';
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

  @media (max-width: 520px) {
    font-size: 1.5rem;
  }
`;

const NavTimer = styled.div`
  /*  */
`;

const Navigation = props => (
  <StyledNavigation color={props.game.gameState.phase}>
    <Container className="d-flex justify-content-between p-0">
      <NavStateName>РАЗДАЧА НОМЕРОВ</NavStateName>
      <NavTimer>1:00</NavTimer>
      <NavMenu />
    </Container>
  </StyledNavigation>
);

const mapStateToProps = state => ({ game: state.game });
export default connect(mapStateToProps)(Navigation);
