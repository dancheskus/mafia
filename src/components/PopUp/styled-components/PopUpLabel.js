import styled from 'styled-components';
import colors from 'colors.js';

export default styled.div`
  text-transform: uppercase;
  text-align: center;
  color: ${props => (props.color ? colors[props.color].popupLabel : '#fff')};
`;
