import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';

import NavMenu from 'components/NavMenu';
import { gameSelector, settingsSelector } from 'redux/selectors';
import PHASE from 'common/phaseEnums';

import AudioPlayer from './AudioPlayer';
import { ButtonsWrapper, NavStateName, StyledNavigation } from './style';
import PlayerControls from './PlayerControls';

export default function NavBar() {
  const { tutorialEnabled, appMusic } = useSelector(settingsSelector);
  const { phase, dayNumber } = useSelector(gameSelector).gameState;

  const phaseTitles = {
    SeatAllocator: 'раздача номеров',
    RoleDealing: 'раздача ролей',
    ZeroNight: '0 ночь',
    Day: `${dayNumber} день`,
    Voting: 'Голосование',
    Night: `${dayNumber} Ночь`,
    EndOfGame: 'Конец игры',
  };
  const currentPhaseTitle = phaseTitles[phase];

  return (
    <StyledNavigation color={phase} tutorialEnabled={tutorialEnabled}>
      <Container className='d-flex justify-content-between p-0'>
        <NavStateName tutorialEnabled={tutorialEnabled} key={currentPhaseTitle}>
          <span data-testid='phaseTitle'>{currentPhaseTitle}</span>
        </NavStateName>

        {phase === PHASE.DAY && <PlayerControls />}

        {appMusic && (
          <ButtonsWrapper
            style={{
              ...(phase !== PHASE.NIGHT &&
                phase !== PHASE.ZERONIGHT &&
                phase !== PHASE.ROLEDEALING && { display: 'none' }),
            }}
          >
            {phase !== PHASE.SEATALLOCATOR && <AudioPlayer />}
          </ButtonsWrapper>
        )}

        <NavMenu />
      </Container>
    </StyledNavigation>
  );
}
