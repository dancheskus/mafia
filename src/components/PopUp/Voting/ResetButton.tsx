import styled from 'styled-components';
import React from 'react';

import colors from 'style/colors';
import { ResetIcon } from 'icons/svgIcons';

const ResetButtonStyle = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${colors.Voting.popupButton};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  transition: filter 0.2s !important;

  :hover {
    filter: brightness(110%);
  }
`;

export default function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <ResetButtonStyle onClick={onClick}>
      <ResetIcon size='75%' />
    </ResetButtonStyle>
  );
}
