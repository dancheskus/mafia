import styled from 'styled-components';

import colors from 'style/colors';

export const Sheriff = styled.div`
  width: 70%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    color: white;
    font-size: 5rem;
    position: absolute;

    @media (max-width: 430px) {
      font-size: 3.7rem;
    }
  }
`;

export const BlackTeamPlayers = styled.div`
  display: flex;
  height: 50%;
  width: 40%;

  > div:first-child {
    align-self: flex-start;
  }
  > div:last-child {
    align-self: flex-end;
  }
  > div {
    align-self: center;
  }

  @media (max-width: 1300px) {
    width: 45%;
  }
  @media (max-width: 1200px) {
    width: 50%;
  }
  @media (max-width: 1000px) {
    width: 70%;
  }
  @media (max-width: 560px) {
    width: 80%;
  }

  @media (min-height: 700px) {
    height: 40%;
  }
`;

export const Target = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    color: white;
    font-size: 2rem;
    position: absolute;
  }
`;

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.Night.popupButton};
  display: flex;
  flex-direction: center;
  justify-content: center;
  padding: 10px;
  transform: rotate(180deg);
  cursor: pointer;
  transition: filter 0.2s !important;
  position: absolute;
  top: 20px;
  left: 20px;

  :hover {
    filter: brightness(110%);
  }

  @media (max-height: 860px) {
    width: 30px;
    height: 30px;
    padding: 7px;
  }
`;
