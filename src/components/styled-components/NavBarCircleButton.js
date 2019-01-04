import styled from 'styled-components';
import colors from 'colors.js';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${colors.Day.deadPlayerCardNumber};
  margin-left: 15px;
`;
