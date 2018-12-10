import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import NavBar from './NavBar';
import NumbersPanel from './NumbersPanel';
import PopUp from './PopUp';

const AppWrapper = styled.div`
  height: 100vh;
  overflow: hidden;
`;

const MainApp = styled.div`
  flex-grow: 1;
  background-image: radial-gradient(circle at right bottom, #8b96af, #666a73);
  .container {
    padding: 15px;
  }
`;

export default class App extends Component {
  render() {
    return (
      <AppWrapper className="d-flex flex-column">
        <NavBar />
        <MainApp className="d-flex">
          <Container className="d-flex flex-column">
            <NumbersPanel />
            <PopUp />
          </Container>
        </MainApp>
      </AppWrapper>
    );
  }
}
