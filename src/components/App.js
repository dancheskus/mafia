import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Container } from 'reactstrap';

/* DAY COLORS */
const dayColor = '#e9e1d4';
const votingListItemsDayColor = '#cbc2b7';
/* NIGHT COLORS */
/* NUMBER DEALING COLORS */
const numberDealingColor = '#71B2FE';
const votingListItemsNumberDealingColor = '#98C8FF';
const votingListItemsNumberDealingColorSelected = '#3E97FE';
/* ROLE DEALING COLORS */
/* VOTING COLORS */

const AppWrapper = styled.div`
  height: 100vh;
`;

const Navigation = styled.div`
  background: #666a73;
  padding: 10px 0;

  .container * {
    color: ${numberDealingColor};
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    &:not(:last-child) {
      border-right: 1px solid #8f8f8f;
    }
  }
`;

const NavStateName = styled.h2`
  margin: 0;
  font-weight: 300;
  font-size: 2rem;

  @media (max-width: 520px) {
    font-size: 1.5rem;
  }
`;

const NavTimer = styled.div`
  /* background: red; */
`;

const NavBurger = styled.div`
  width: 30px;
`;

const VotingList = styled.div`
  background: ${numberDealingColor};

  .container {
    padding: 10px;
  }
`;

const VotingListItem = styled.div`
  height: 30px;
  width: 30px;
  background: ${props =>
    props.selected ? votingListItemsNumberDealingColorSelected : votingListItemsNumberDealingColor};
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`;

const MainApp = styled.div`
  flex-grow: 1;
  background-image: radial-gradient(circle at right bottom, #8b96af, #666a73);
  .container {
    margin: 10px auto;
    padding-right: 10px;
    padding-left: 10px;
  }
`;

const PopUp = styled.div`
  background: ${votingListItemsNumberDealingColorSelected};
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
          <Container className="d-flex justify-content-between">
            <NavStateName>РАЗДАЧА НОМЕРОВ</NavStateName>
            <NavTimer>1:00</NavTimer>
            <NavBurger>BU</NavBurger>
          </Container>
        </Navigation>

        <VotingList>
          <Container className="d-flex justify-content-around">
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
          </Container>
        </VotingList>

        <MainApp className="d-flex">
          <Container className="d-flex">
            <PopUp className="flex-grow-1" />
          </Container>
        </MainApp>
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => ({ game: state.game });
export default connect(mapStateToProps)(App);
