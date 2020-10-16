import styled from 'styled-components';

import colors from 'style/colors';

const {
  RoleDealing: { dealingMode, dealingModeSelected },
} = colors;

export const SvgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40%;
  flex-grow: 3;

  div:not(:last-child) {
    border-bottom: 2px solid ${dealingMode};
  }

  path {
    fill: ${({ selected }) => (selected ? dealingModeSelected : dealingMode)};
    transition: fill 0.3s;
  }

  div:hover path,
  .selected path {
    fill: ${dealingModeSelected};
  }
`;
