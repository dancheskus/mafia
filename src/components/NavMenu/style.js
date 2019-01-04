import styled from 'styled-components';

export default styled.div`
  position: relative;
  .navi {
    &_check {
      display: none;
    }

    &-background {
      background: green;
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      position: absolute;
      background-image: radial-gradient(green, blue);
      transition: transform 0.3s;
    }
    &_button {
      background: #fff;
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
      justify-content: center;
      align-items: center;
      width: 100%;
      transition: right 0.3s;
    }

    &_list {
      padding: 0;
      list-style: none;
      text-align: center;
    }

    &_link {
      &:link,
      &:visited {
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
      }

      &:hover,
      &:active {
        background-position: 100%;
        color: green;
        transform: translateX(0.3rem);
      }
    }

    &_check:checked ~ .navi-background {
      transform: scale(200);
    }
    &_check:checked ~ .navi_nav {
      right: 0;
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
`;
