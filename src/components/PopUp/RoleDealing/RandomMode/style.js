import styled from 'styled-components';

import colors from 'style/colors';
import { PopUpButton } from 'components/PopUp/styled-components';

const { popupIcon, popupTextLight, popupText } = colors.RoleDealing;

export const Card = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const RoleName = styled.h1`
  font-size: 400%;
  color: ${({ light }) => (light ? popupTextLight : popupText)};
`;

export const ScaledPopUpButton = styled(PopUpButton)`
  transform: scale(2);
`;

export const PressText = styled.div`
  font-size: 4rem;
  color: ${popupIcon};
  text-transform: uppercase;

  @media (max-width: 767px) {
    font-size: 3rem;
  }
`;
