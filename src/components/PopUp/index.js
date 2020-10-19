import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MaximizeIcon, MinimizeIcon } from 'icons/svgIcons';
import { minimizeMaximaizePopup } from 'redux/actions/gameActions';

import { StyledPopUp, MinimizeButton } from './style';

export default ({ opened, PopupChild }) => {
  const dispatch = useDispatch();
  const {
    game: {
      popupMinimized,
      lightMode,
      gameState: { phase },
    },
    settings: { tutorialEnabled },
  } = useSelector(store => store);

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
