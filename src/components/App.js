import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import NumbersPanel from './NumbersPanel';
import PopUp from './PopUp/PopUp';
import SeatAllocator from './PopUp/SeatAllocator';
import RoleDealing from './PopUp/RoleDealing';

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

class App extends Component {
  render() {
    const phase = this.props.game.gameState.phase;
    const PopUpChildComponent = { SeatAllocator, RoleDealing }[phase];
    return (
      <AppWrapper className="d-flex flex-column">
        <NavBar />
        <MainApp className="d-flex">
          <Container className="d-flex flex-column justify-content-between">
            {phase !== 'startScreen' && <NumbersPanel />}

            {(phase === 'SeatAllocator' || phase === 'RoleDealing') && (
              <PopUp>
                <PopUpChildComponent />
              </PopUp>
            )}
          </Container>
        </MainApp>
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => ({ game: state.game });
export default connect(mapStateToProps)(App);
