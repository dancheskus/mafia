import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';

import colors from '../../colors';

const Circle = styled.div`
  width: 180px;
  height: 180px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
  color: ${colors.Voting.popupText};
`;

const BlockOfHands = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;

  flex-wrap: wrap;
`;

const HandsButton = styled.button`
  :hover,
  :focus,
  :active {
    outline: none;
  }

  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: ${props =>
    props.selected
      ? colors.Voting.handsAmountSelectedBackground
      : props.disabled
      ? colors.Voting.handsAmountDisabledBackground
      : colors.Voting.handsAmountBackground};
  border-radius: 10px;
  margin: 3px;
  color: ${props =>
    props.selected
      ? colors.Voting.popupTextInverse
      : props.disabled
      ? colors.Voting.handsAmountDisabledText
      : colors.Voting.popupText};
  font-size: 2rem;
  ${props => !props.disabled && 'cursor: pointer'};
  /* flex-basis: 20%; */
`;

class Voting extends Component {
  state = { handsAmount: null };

  render = () => {
    const alivePlayers = this.props.players.filter(player => player.isAlive).length;
    return (
      <>
        <Circle>1</Circle>
        <BlockOfHands>
          {_.range(1, 11).map(num => (
            <HandsButton
              disabled={num > alivePlayers}
              selected={this.state.handsAmount === num}
              onClick={() => this.setState({ handsAmount: num })}
              key={num}
            >
              {num}
            </HandsButton>
          ))}
        </BlockOfHands>
      </>
    );
  };
}

const mapStateToProps = ({ players }) => ({ players });

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Voting);
