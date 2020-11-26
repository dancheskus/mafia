import styled from 'styled-components';

import colors from 'style/colors';

const { dealingMode, dealingModeSelected } = colors.RoleDealing;

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40%;
  flex-grow: 3;

  div:not(:last-child) {
    border-bottom: 2px solid ${dealingMode};
  }

  path {
    fill: ${dealingMode};
    transition: fill 0.3s;
  }

  div:hover path,
  .selected path {
    fill: ${dealingModeSelected};
  }
`;
