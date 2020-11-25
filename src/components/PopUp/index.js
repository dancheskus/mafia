import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MaximizeIcon, MinimizeIcon } from 'icons/svgIcons';
import { minimizeMaximaizePopup } from 'redux/actions/gameActions';
import { gameSelector, settingsSelector } from 'redux/selectors';

import { StyledPopUp, MinimizeButton } from './style';

export default ({ opened, PopupChild }) => {
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
      {phase !== 'SeatAllocator' && phase !== 'RoleDealing' && phase !== 'EndOfGame' && (
        <MinimizeButton
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
};
