import { useDispatch, useSelector } from 'react-redux';

import { MaximizeIcon, MinimizeIcon } from 'icons/svgIcons';
import { minimizeMaximaizePopup } from 'redux/actions/gameActions';
import { gameSelector, settingsSelector } from 'redux/selectors';
import PHASE from 'common/phaseEnums';

import { StyledPopUp, MinimizeButton } from './style';

interface Props {
  opened: boolean;
  PopupChild: () => JSX.Element;
}

export default function PopUp({ opened, PopupChild }: Props) {
  const dispatch = useDispatch();
  const { tutorialEnabled } = useSelector(settingsSelector);
  const {
    popupMinimized,
    lightMode,
    gameState: { phase },
  } = useSelector(gameSelector);

  return (
    <StyledPopUp
      className='styled-popup'
      tutorialEnabled={tutorialEnabled}
      opened={opened}
      color={phase}
      light={lightMode}
      minimized={popupMinimized}
    >
      {phase !== PHASE.SEATALLOCATOR && phase !== PHASE.ROLEDEALING && phase !== PHASE.ENDOFGAME && (
        <MinimizeButton
          data-testid='minimizeButton'
          tutorialEnabled={tutorialEnabled}
          className='minimize-button'
          color={phase}
          light={lightMode}
          onClick={() => dispatch(minimizeMaximaizePopup())}
        >
          {popupMinimized ? <MaximizeIcon size='50%' /> : <MinimizeIcon size='50%' />}
        </MinimizeButton>
      )}

      <PopupChild />
    </StyledPopUp>
  );
}
