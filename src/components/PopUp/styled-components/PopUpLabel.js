import styled from 'styled-components';
import colors from 'colors.js';

export const PopUpLabel = styled.div`
  text-transform: uppercase;
  text-align: center;
  color: ${props => (props.color ? colors[props.color].popupLabel : '#fff')};
  width: 80%;

  ${({ light }) => light && 'font-weight: 300'};

  @media (max-width: 450px) {
    font-size: 1.8rem;
  }

  @media (max-width: 400px) {
    font-size: 1.5rem;
  }
`;
