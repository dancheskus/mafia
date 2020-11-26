import styled, { css } from 'styled-components';

export const GuideButton = styled.div<{ guideNextStep?: boolean; skipGuide?: boolean; light?: boolean }>`
  ${({ guideNextStep, skipGuide, light }) => css`
    z-index: 3500;
    background: rgba(0, 0, 0, ${light ? '0.124' : '0.400'});
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    transition: background 0.3s;
    text-transform: uppercase;
    cursor: pointer;
    position: fixed;
    bottom: 20px;
    ${guideNextStep && 'right: 20px'};
    ${skipGuide && 'left: 20px'};

    &:hover {
      background: rgba(0, 0, 0, 0.464);
    }
  `}
`;

export const GuideOverlay = styled.div`
  z-index: 3000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.4;
`;

export const GuideWrapperStyle = styled.div<{ currentStep: number }>`
  ${({ currentStep }) => {
    switch (currentStep) {
      case 0:
        return '.seat-allocator-panel { z-index: 3001 }';
      case 1:
        return '.seat-allocator-big-circle, .seat-allocator-panel { z-index: 3001 }';
      case 2:
        return '.navi_button { z-index: 4001 }';
      case 3:
        return '.audio-player-pause-play, .audio-player-next { z-index: 3001 }; .styled-popup { z-index: 1 };';
      case 4:
        return '.role-dealing-panel, .role-selection-wrapper { z-index: 3001 };';
      case 5:
        return '.styled-popup { z-index: 3001 }';
      case 6:
        return '.add-foul, .remove-foul { z-index: 3001;  }; .add-foul {border-bottom-right-radius: 10px }; .remove-foul { border-top-right-radius: 10px }; .styled-popup { z-index: 1 };';
      case 7:
        return '.day-user-navigation { z-index: 3001; };';
      case 8:
        return '.day-panel { z-index: 3001; };';

      default:
        break;
    }
  }}
`;

export const GuideStepWrapperStyle = styled.div<{ position: string }>`
  z-index: 3100;
  position: fixed;
  background: rgba(256, 256, 256, 0.9);
  padding: 10px 20px;
  border-radius: 10px;

  ${({ position }) => {
    switch (position) {
      case 'left':
        return css`
          top: 50%;
          left: 8px;
          transform: translateY(-50%);
          width: 30%;

          @media (max-width: 991px) {
            width: 40%;
          }
        `;

      case 'top':
        return css`
          top: 70px;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;

          @media (max-width: 991px) {
            width: 90%;
          }
        `;

      case 'afterNumbersPanel':
        return css`
          top: 135px;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;

          @media (max-width: 991px) {
            width: 90%;
          }
        `;

      case 'bottom':
        return css`
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;

          @media (max-width: 991px) {
            width: 90%;
          }
        `;

      default:
        return css`
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50%;

          @media (max-width: 991px) {
            width: 90%;
          }
        `;
    }
  }}
`;

export const GuideStepTitleStyle = styled.div`
  font-size: 1.3rem;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 15px;
  border-bottom: 1px solid black;

  @media (max-width: 991px) {
    font-size: 1rem;
  }
`;

export const GuideStepContentStyle = styled.div`
  font-weight: 500;

  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 991px) {
    font-size: 0.9rem;
    font-weight: 400;
  }
`;
