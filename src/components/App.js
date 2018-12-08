import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Container } from 'reactstrap';

import SeatAllocator from './SeatAllocator';

/* DAY COLORS */
// const dayColor = '#e9e1d4';
// const votingListItemsDayColor = '#cbc2b7';
/* NIGHT COLORS */
/* NUMBER DEALING COLORS */
const seatAllocatorColor = '#71B2FE';
const votingListItemsSeatAllocatorColor = '#98C8FF';
const votingListItemsSeatAllocatorColorSelected = '#3E97FE';
/* ROLE DEALING COLORS */
/* VOTING COLORS */

const AppWrapper = styled.div`
  height: 100vh;
`;

const Navigation = styled.div`
  background: #46494e;

  .container > * {
    padding: 10px;
    color: ${seatAllocatorColor};
    display: flex;
    justify-content: center;
    align-items: center;

    &:not(:last-child) {
      border-right: 2px solid #8f8f8f;
    }
  }
`;

const NavStateName = styled.h2`
  margin: 0;
  font-weight: 300;
  font-size: 2rem;
  flex-grow: 1;

  @media (max-width: 520px) {
    font-size: 1.5rem;
  }
`;

const NavTimer = styled.div`
  /* background: red; */
  flex-grow: 1;
`;

const VotingList = styled.div`
  background: ${seatAllocatorColor};
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const VotingListItem = styled.div`
  height: 30px;
  width: 30px;
  background: ${props =>
    props.selected ? votingListItemsSeatAllocatorColorSelected : votingListItemsSeatAllocatorColor};
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  box-shadow: 0px 9px 35px -8px rgba(0, 0, 0, 0.49);
`;

const MainApp = styled.div`
  flex-grow: 1;
  background-image: radial-gradient(circle at right bottom, #8b96af, #666a73);
  .container {
    padding: 15px;
  }
`;

const Navi = styled.div`
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

      /* position: fixed;
      top: 2.5rem;
      right: 2.5rem; */
      background-image: radial-gradient(green, blue);
      transition: transform 0.3s;
    }
    &_button {
      background: #fff;
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      margin: 0;
      /* position: absolute;
      top: 0;
      left: 0; */
      /* position: fixed;
      top: 2.3rem;
      right: 2.3rem; */
      z-index: 3;
      box-shadow: 0 0.5rem 1.5rem rgba(black, 0.1);
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
      z-index: 2;

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

    &_item {
      /* margin: 1rem; */
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

const PopUp = styled.div`
  background: ${votingListItemsSeatAllocatorColorSelected};
  border-radius: 10px;
  box-shadow: 0px 9px 24px -2px rgba(0, 0, 0, 0.52);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  user-select: none;
`;

class App extends Component {
  state = {
    collapsed: true,
  };

  toggleNavbar = () => this.setState({ collapsed: !this.state.collapsed });

  render() {
    return (
      <AppWrapper className="d-flex flex-column">
        <Navigation>
          <Container className="d-flex justify-content-between p-0">
            <NavStateName>РАЗДАЧА НОМЕРОВ</NavStateName>
            <NavTimer>1:00</NavTimer>
            <Navi className="navi">
              <input type="checkbox" className="navi_check" id="navi-toggle" />
              <label htmlFor="navi-toggle" className="navi_button">
                <span className="navi_icon">&nbsp;</span>
              </label>
              {/* <div className="navi-background" /> */}
              <div className="navi_nav">
                <ul className="navi_list">
                  <li className="navi_item">
                    <a href="/" className="navi_link">
                      Настройки
                    </a>
                  </li>
                  <li className="navi_item">
                    <a href="/" className="navi_link">
                      Плеер
                    </a>
                  </li>
                  <li className="navi_item">
                    <a href="/" className="navi_link">
                      Выход
                    </a>
                  </li>
                </ul>
              </div>
            </Navi>
          </Container>
        </Navigation>

        <MainApp className="d-flex">
          <Container className="d-flex flex-column">
            <VotingList className="d-flex justify-content-around">
              <VotingListItem selected>1</VotingListItem>
              <VotingListItem>2</VotingListItem>
              <VotingListItem>3</VotingListItem>
              <VotingListItem>4</VotingListItem>
              <VotingListItem>5</VotingListItem>
              <VotingListItem selected>6</VotingListItem>
              <VotingListItem>7</VotingListItem>
              <VotingListItem>8</VotingListItem>
              <VotingListItem>9</VotingListItem>
              <VotingListItem>10</VotingListItem>
            </VotingList>

            <PopUp className="flex-grow-1">
              <SeatAllocator />
            </PopUp>
          </Container>
        </MainApp>
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => ({ game: state.game });
export default connect(mapStateToProps)(App);
