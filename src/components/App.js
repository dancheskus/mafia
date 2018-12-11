import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import NumbersPanel from './NumbersPanel';
import PopUp from './PopUp/PopUp';
import SeatAllocator from './PopUp/SeatAllocator';

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
    const PopUpChildComponent = { SeatAllocator }[this.props.game.gameState.phase];
    return (
      <AppWrapper className="d-flex flex-column">
        <NavBar />
        <MainApp className="d-flex">
          <Container className="d-flex flex-column justify-content-between">
            {this.props.game.gameState.phase !== 'startScreen' && <NumbersPanel />}

            {this.props.game.gameState.phase === 'SeatAllocator' && (
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
