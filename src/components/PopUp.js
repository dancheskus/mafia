import React from 'react';
import styled from 'styled-components';

import { numberPanelItemsSeatAllocatorColorSelected } from '../colors';
import SeatAllocator from './SeatAllocator';

const PopUp = styled.div`
  background: ${numberPanelItemsSeatAllocatorColorSelected};
  border-radius: 10px;
  box-shadow: 0px 9px 24px -2px rgba(0, 0, 0, 0.52);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  user-select: none;
`;

export default () => (
  <PopUp className="flex-grow-1">
    <SeatAllocator />
  </PopUp>
);
