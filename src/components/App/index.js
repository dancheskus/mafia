import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';

import useOnMount from 'helpers/useOnMount';
import NavBar from 'components/NavBar';
import NumbersPanel from 'components/NumbersPanel';
import PopUp from 'components/PopUp';
import SeatAllocator from 'components/PopUp/SeatAllocator';
import RoleDealing from 'components/PopUp/RoleDealing';
import ZeroNight from 'components/PopUp/ZeroNight';
import PlayerCards from 'components/PlayerCards';
import Voting from 'components/PopUp/Voting';
import Night from 'components/PopUp/Night';
import Day from 'components/PopUp/Day';
import EndOfGame from 'components/PopUp/EndOfGame';
import GuideWrapper from 'components/UserGuide';
import { GuideOverlay } from 'components/UserGuide/style';
import { gameSelector, settingsSelector } from 'redux/selectors';
import GlobalStyle from 'style/GlobalStyle';

import { AppWrapper, MainApp, MainContentWrapper, UnsupportedRes } from './style';

export default () => {
  const {
    gameState: { phase },
    activePlayer,
    popupOpened,
  } = useSelector(gameSelector);
  const { tutorialEnabled } = useSelector(settingsSelector);

  const [appHeight, setAppHeight] = useState(document.documentElement.clientHeight);

  const updateHeight = () => {
    setAppHeight(document.documentElement.clientHeight);

    // Фикс для Chrome на iOS, который не успевает пересчитать размер, в отличае от Safari.
    setTimeout(() => {
      setAppHeight(document.documentElement.clientHeight);
    }, 200);
  };

  useOnMount(() => {
    window.addEventListener('load', updateHeight);
    window.addEventListener('resize', updateHeight);
  });

  const PopUpChildComponent = { SeatAllocator, RoleDealing, ZeroNight, Voting, Night, Day, EndOfGame }[phase];

  return (
    <>
      <GlobalStyle />

      {appHeight < 535 && (
        <UnsupportedRes>
          <h3>Это разрешение не поддерживается</h3>
        </UnsupportedRes>
      )}

      {tutorialEnabled && <GuideOverlay />}

      <GuideWrapper>
        <AppWrapper appHeight={appHeight} className='d-flex flex-column'>
          <NavBar />

          <MainApp className='d-flex'>
            {/* {window.innerHeight} {window.innerWidth} */}
            <Container className='d-flex flex-column justify-content-between'>
              <NumbersPanel key={activePlayer} />

              <MainContentWrapper>
                {<PopUp key={phase + 1} opened={popupOpened} PopupChild={PopUpChildComponent} />}

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
