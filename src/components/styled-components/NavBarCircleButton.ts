import styled from 'styled-components';

import colors from 'style/colors';

export default styled.div<{ disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${colors.Day.deadPlayerCardNumber};
  ${({ disabled }) => (disabled ? 'filter: brightness(45%)' : 'cursor: pointer')};
`;
