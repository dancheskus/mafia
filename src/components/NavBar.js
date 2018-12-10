import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import { seatAllocatorColor } from '../colors';
import NavMenu from './NavMenu/index';

const Navigation = styled.div`
  background: #46494e;

  .container > * {
    padding: 10px;
    color: ${seatAllocatorColor};
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

export default () => (
  <Navigation>
    <Container className="d-flex justify-content-between p-0">
      <NavStateName>РАЗДАЧА НОМЕРОВ</NavStateName>
      <NavTimer>1:00</NavTimer>
      <NavMenu />
    </Container>
  </Navigation>
);
