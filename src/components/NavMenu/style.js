import styled from 'styled-components';

const menuColors = {
  primary: '#759EFF',
  secondary: '#435784',
};

export const StyledNavMenu = styled.div`
  position: relative;
  transition: opacity 0.5s;

  .navi {
    &_check {
      display: none;
    }

    &-background {
      background: ${menuColors.primary};
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      position: absolute;
      background-image: radial-gradient(${menuColors.primary}, ${menuColors.secondary});
      transition: transform 0.3s;
    }
    &_button {
      background: grey;
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      margin: 0;
      z-index: 300;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover > .navi_icon {
        &::before {
          transform: translateY(-1px);
        }
        &::after {
          transform: translateY(1px);
        }
      }
    }
    &_nav {
      height: 100vh;
      position: fixed;
      top: 0;
      right: -2000px;
      z-index: 200;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      transition: right 0.3s, opacity 0.5s;
    }

    &_list {
      padding: 0;
      list-style: none;
      text-align: center;
    }

    &_link {
      display: inline-block;
      font-size: 2rem;
      font-weight: 300;
      padding: 0.5rem 1rem;
      color: #fff;
      text-decoration: none;
      text-transform: uppercase;
      background-image: linear-gradient(120deg, transparent 0%, transparent 50%, white 0%);
      background-size: 240%;
      transition: all 0.4s;

      &:hover,
      &:active {
        background-position: 100%;
        color: grey;
        transform: translateX(0.3rem);
      }
    }

    &_check:checked ~ .navi_button {
      background: ${menuColors.primary};
    }

    &_check:checked ~ .navi-background {
      transform: scale(200);
    }
    &_check:checked ~ .navi_nav {
      right: 0;
    }

    &_check:checked ~ .menu-footer {
      left: 50%;
      transform: translateX(-50%);
    }

    &_check:checked + .navi_button .navi_icon {
      background: transparent;

      &:before {
        top: 0;
        transform: rotate(135deg);
      }
      &:after {
        top: 0;
        transform: rotate(-135deg);
      }
    }

    &_icon {
      position: relative;
      &,
      &::before,
      &::after {
        transition: all 0.3s;
        width: 1.5rem;
        height: 2px;
        background: black;
        display: inline-block;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
      }
      &::before {
        top: -0.45rem;
      }
      &::after {
        top: 0.45rem;
      }
    }
  }

  .menu-footer {
    color: white;
    opacity: 0.3;
    font-weight: 100;
    position: fixed;
    bottom: 4%;
    left: -2000px;
    transition: left 0.3s;
    z-index: 210;

    > a {
      color: white;
      text-decoration: none;
      border-bottom: 1px solid white;
      top: 0;
      padding-bottom: 0;
      transition: top 0.5s, padding-bottom 0.5s;

      &:hover {
        position: relative;
        padding-bottom: 2px;
        top: -2px;
      }
    }

    @media (max-width: 620px) {
      font-size: 0.8rem;
    }
  }
`;

export const AppSettings = styled.div`
  ${props =>
    props.hide
      ? `
      left: -2000px;
      opacity: 0;
      z-index: 180;
    `
      : `
      left: 50%;
      opacity: 1;
      z-index: 400;
    `}

  transition: opacity 0.5s;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 70%;
  background: rgb(145, 178, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  border-radius: 30px;
  padding: 30px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  @media (max-width: 750px) {
    width: 80%;
  }
`;

export const SettingsLine = styled.div`
  border-bottom: 1px solid rgb(122, 156, 236);
  width: 100%;
  padding: 15px 0 15px 0;
  color: white;
  font-weight: 100;
  display: flex;
  align-items: center;
  text-align: left;

  span {
    width: 90%;
  }
`;

export const BackButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgb(122, 156, 236);
  display: flex;
  flex-direction: center;
  justify-content: center;
  padding: 10px;
  transform: rotate(180deg);
  align-self: flex-start;
`;

export const MenuItems = styled.div`
  opacity: ${props => (props.hide ? 0 : 1)};
`;
