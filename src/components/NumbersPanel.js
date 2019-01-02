import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import styled from 'styled-components';

import colors from '../colors';
import { addToSelectedNumbers, clearSelectedNumbers, removeLastSelectedNumber } from '../redux/actions/gameActions';

const Panel = styled.div`
  background: ${props => colors[props.color].numbersPanel};
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: ${props => (props.itemsCentered ? 'center' : 'space-around')};
  ${props =>
    props.itemsCentered &&
    `
    > div:not(:first-child) {
      margin-left: 10px
    }
  `}
`;

const PanelItem = styled.div`
  height: 30px;
  width: 30px;
  background: ${props => (props.selected ? colors[props.color].numberSelected : colors[props.color].number)};
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  box-shadow: 0px 9px 35px -8px rgba(0, 0, 0, 0.49);
  cursor: ${props => (props.pointer ? 'pointer' : 'default')};
  ${props => props.border && `border: 2px solid ${colors.Day.addSecondFoulBackground};`}
`;

class NumbersPanel extends Component {
  state = { playerAddedNumber: false };

  render = () => {
    const phase = this.props.game.gameState.phase;
    const numbersPanelClickable = this.props.game.numbersPanelClickable;

    return (
      <>
        {(phase === 'SeatAllocator' || phase === 'ZeroNight') && (
          <Panel color={phase}>
            {this.props.game.selectedNumbers.map(selNum => (
              <PanelItem color={phase} key={selNum} selected>
                {selNum + 1}
              </PanelItem>
            ))}

            {_.range(0, 10)
              .filter(e => !this.props.game.selectedNumbers.includes(e))
              .map(notSelNum => (
                <PanelItem color={phase} key={notSelNum}>
                  {notSelNum + 1}
                </PanelItem>
              ))}
          </Panel>
        )}

        {phase === 'Day' && (
          <Panel color={phase}>
            {this.props.game.selectedNumbers.map(selNum => {
              const lastAddedNumber =
                selNum === _.last(this.props.game.selectedNumbers) && this.state.playerAddedNumber;

              return (
                <PanelItem
                  color={phase}
                  key={selNum}
                  pointer={lastAddedNumber}
                  border={lastAddedNumber}
                  onClick={() => {
                    if (!lastAddedNumber) return;
                    this.props.removeLastSelectedNumber();
                    this.setState({ playerAddedNumber: false });
                  }}
                  selected
                >
                  {selNum + 1}
                </PanelItem>
              );
            })}

            {_.range(0, 10)
              .filter(e => !this.props.game.selectedNumbers.includes(e))
              .map(
                notSelNum =>
                  this.props.players[notSelNum].isAlive && (
                    <PanelItem
                      color={phase}
                      key={notSelNum}
                      pointer={!this.state.playerAddedNumber}
                      border={!this.state.playerAddedNumber}
                      onClick={() => {
                        if (this.state.playerAddedNumber) return;
                        this.props.addToSelectedNumbers(notSelNum);
                        this.setState({ playerAddedNumber: true });
                      }}
                    >
                      {notSelNum + 1}
                    </PanelItem>
                  )
              )}
          </Panel>
        )}

        {phase === 'Voting' && (
          <Panel color={phase} itemsCentered>
            {this.props.game.selectedNumbers.map(selNum => (
              <PanelItem color={phase} key={selNum} selected>
                {selNum + 1}
              </PanelItem>
            ))}
          </Panel>
        )}

        {phase === 'EndOfGame' && (
          <Panel color={phase}>
            {this.props.players.map((player, i) => (
              <PanelItem color={phase} key={i} selected={player.role === 'ДОН' || player.role === 'МАФИЯ'}>
                {i + 1}
              </PanelItem>
            ))}
          </Panel>
        )}

        {phase === 'RoleDealing' && (
          <Panel color={phase}>
            {_.range(0, 10).map(num => (
              <PanelItem
                pointer={numbersPanelClickable}
                color={phase}
                key={num}
                selected={num === this.props.game.selectedNumbers[0]}
                onClick={() => {
                  if (!numbersPanelClickable) return;
                  this.props.clearSelectedNumbers();
                  this.props.addToSelectedNumbers(num);
                }}
              >
                {numbersPanelClickable && this.props.players[num].role === 'МАФИЯ' && 'М'}
                {numbersPanelClickable && this.props.players[num].role === 'ШЕРИФ' && 'Ш'}
                {numbersPanelClickable && this.props.players[num].role === 'ДОН' && 'Д'}
                {numbersPanelClickable && this.props.players[num].role === 'МИРНЫЙ' && num + 1}
                {!numbersPanelClickable && num + 1}
              </PanelItem>
            ))}
          </Panel>
        )}
      </>
    );
  };
}

export default connect(
  ({ game, players }) => ({ game, players }),
  { addToSelectedNumbers, clearSelectedNumbers, removeLastSelectedNumber }
)(NumbersPanel);
