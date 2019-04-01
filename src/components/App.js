import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import NumbersPanel from './NumbersPanel';
import PopUp from './PopUp';
import SeatAllocator from './PopUp/SeatAllocator';
import RoleDealing from './PopUp/RoleDealing';
import ZeroNight from './PopUp/ZeroNight';
import PlayerCards from './PlayerCards';
import Voting from './PopUp/Voting';
import Night from './PopUp/Night';
import Day from './PopUp/Day';
import EndOfGame from './PopUp/EndOfGame';
import GuideWrapper, { GuideOverlay } from './UsersGuide';

const AppWrapper = styled.div`
  height: 100vh;
  height: ${props => props.appHeight}px;
  overflow: hidden;
`;

const MainApp = styled.div`
  flex-grow: 1;
  min-height: 0;
  background-image: radial-gradient(circle at right bottom, #8b96af, #666a73);
  .container {
    padding: 15px;
  }
`;

const MainContentWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column-reverse;
  position: relative;
  justify-content: center;
  min-height: 0;
`;

const UnsupportedRes = styled.div`
  z-index: 5000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: green;
  display: flex;
  justify-content: center;
  align-items: center;

  > h3 {
    width: 50%;
    text-align: center;
    background: white;
    color: black;
    padding: 30px 10px;
    border-radius: 20px;
    opacity: 0.8;
  }
`;

const App = props => {
  const [appHeight, setAppHeight] = useState(window.innerHeight);

  useEffect(() => window.addEventListener('resize', updateHeight), []);

  const updateHeight = () => setAppHeight(document.documentElement.clientHeight);

  const phase = props.game.gameState.phase;
  const PopUpChildComponent = { SeatAllocator, RoleDealing, ZeroNight, Voting, Night, Day, EndOfGame }[phase];
  const { tutorialEnabled } = props.settings;

  return (
    <>
      {appHeight < 535 && (
        <UnsupportedRes>
          <h3>Это разрешение не поддерживается</h3>
        </UnsupportedRes>
      )}

      {tutorialEnabled && <GuideOverlay />}

      <GuideWrapper>
        <AppWrapper appHeight={appHeight} className="d-flex flex-column">
          <NavBar />

          <MainApp className="d-flex">
            {/* {window.innerHeight} {window.innerWidth} */}
            <Container className="d-flex flex-column justify-content-between">
              {phase !== 'startScreen' && <NumbersPanel key={props.game.activePlayer} />}

              <MainContentWrapper>
                {<PopUp key={phase + 1} opened={props.game.popupOpened} popupChild={PopUpChildComponent} />}

                {phase !== 'SeatAllocator' && phase !== 'RoleDealing' && phase !== 'EndOfGame' && (
                  <PlayerCards key={phase} />
                )}
              </MainContentWrapper>
            </Container>
          </MainApp>
        </AppWrapper>
      </GuideWrapper>
    </>
  );
};

const mapStateToProps = ({ game, settings }) => ({ game, settings });
export default connect(mapStateToProps)(App);
