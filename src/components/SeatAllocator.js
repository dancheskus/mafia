import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const PopUpButton = styled.button`
  background: #70b2ff;
  padding: 10px 25px;
  outline: none;
  border: none;
  color: white;
  border-radius: 30px;
  font-size: 1.1rem;
  text-transform: uppercase;
`;

const BigCircle = styled.div`
  
  width: 220px;
  height: 220px;
  border-radius: 50%;
  
  /* font-size: ${props => (props.number ? '9rem' : '2.3rem')}; */
  font-weight: 600;
  text-transform: uppercase;
  ${props =>
    props.number
      ? `
  font-size: 9rem;
  color: #3E97FE;
  background: white;
  `
      : `font-size: 2.3rem;
      color: white;
      background: #70b2ff;
      `}
`;

export default class SeatAllocator extends Component {
  state = { randomNumber: null };

  seats = _.shuffle(_.range(1, 11));

  stopInterval = () => {
    clearInterval(this.interval);
    this.seats.length && this.setState({ randomNumber: this.seats.pop() });
  };

  randomClicked = () => {
    let i = 0;
    this.interval = setInterval(() => {
      this.seats.length && this.setState({ randomNumber: _.random(1, 10) });
      ++i === 20 && this.stopInterval();
    }, 20);
  };

  render = () => (
    <Fragment>
      <BigCircle
        className="d-flex justify-content-center align-items-center"
        onClick={this.randomClicked}
        number={this.state.randomNumber}
      >
        {this.state.randomNumber || 'нажми'}
      </BigCircle>
      <PopUpButton>{this.seats.length ? 'пропустить' : 'играть'}</PopUpButton>
    </Fragment>
  );
}
