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
  ${props => props.pointer && `border: 2px solid ${colors.Day.addSecondFoulBackground};`}
`;

class NumbersPanel extends Component {
  state = { playerAddedNumber: false };

  render = () => {
    const phase = this.props.game.gameState.phase;
    const numbersPanelClickable = this.props.game.numbersPanelClickable;

    return (
      <>
        {(phase === 'SeatAllocator' || phase === 'ZeroNight') && (
          <Panel color={phase} className="d-flex justify-content-around">
            {this.props.game.selectedNumbers.map(selNum => (
              <PanelItem color={phase} key={selNum} selected>
                {selNum}
              </PanelItem>
            ))}

            {_.range(1, 11)
              .filter(e => !this.props.game.selectedNumbers.includes(e))
              .map(notSelNum => (
                <PanelItem color={phase} key={notSelNum}>
                  {notSelNum}
                </PanelItem>
              ))}
          </Panel>
        )}

        {phase === 'Day' && (
          <Panel color={phase} className="d-flex justify-content-around">
            {this.props.game.selectedNumbers.map(selNum => {
              const lastAddedNumber =
                selNum === _.last(this.props.game.selectedNumbers) && this.state.playerAddedNumber;

              return (
                <PanelItem
                  color={phase}
                  key={selNum}
                  pointer={lastAddedNumber}
                  onClick={() => {
                    if (!lastAddedNumber) return;
                    this.props.removeLastSelectedNumber();
                    this.setState({ playerAddedNumber: false });
                  }}
                  selected
                >
                  {selNum}
                </PanelItem>
              );
            })}

            {_.range(1, 11)
              .filter(e => !this.props.game.selectedNumbers.includes(e))
              .map(notSelNum => (
                <PanelItem
                  color={phase}
                  key={notSelNum}
                  pointer={!this.state.playerAddedNumber}
                  onClick={() => {
                    if (this.state.playerAddedNumber) return;
                    this.props.addToSelectedNumbers(notSelNum);
                    this.setState({ playerAddedNumber: true });
                  }}
                >
                  {notSelNum}
                </PanelItem>
              ))}
          </Panel>
        )}

        {phase === 'RoleDealing' && (
          <Panel color={phase} className="d-flex justify-content-around">
            {_.range(1, 11).map(num => (
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
                {numbersPanelClickable && this.props.players[num - 1].role === 'МАФИЯ' && 'М'}
                {numbersPanelClickable && this.props.players[num - 1].role === 'ШЕРИФ' && 'Ш'}
                {numbersPanelClickable && this.props.players[num - 1].role === 'ДОН' && 'Д'}
                {numbersPanelClickable && this.props.players[num - 1].role === 'МИРНЫЙ' && num}
                {!numbersPanelClickable && num}
              </PanelItem>
            ))}
          </Panel>
        )}
      </>
    );
  };
}

const mapStateToProps = ({ game, players }) => ({ game, players });
const mapDispatchToProps = dispatch => ({
  addToSelectedNumbers: playerNumber => dispatch(addToSelectedNumbers(playerNumber)),
  clearSelectedNumbers: () => dispatch(clearSelectedNumbers()),
  removeLastSelectedNumber: () => dispatch(removeLastSelectedNumber()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NumbersPanel);
