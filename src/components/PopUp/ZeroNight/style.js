import styled from 'styled-components';

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    color: white;
    font-size: 2rem;
    position: absolute;
  }

  .label {
    color: white;
    position: absolute;
    bottom: -30%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 170%;
  }
`;

export const TwoIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;

  @media (max-width: 767px) {
    width: 80%;
  }
`;
