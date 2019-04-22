import React, { Component } from 'react';
import { connect } from 'react-redux';
import { range, last } from 'lodash';
import styled from 'styled-components';

import colors from 'colors.js';
import { addToSelectedNumbers, clearSelectedNumbers, removeLastSelectedNumber } from '../redux/actions/gameActions';

const Panel = styled.div`
  position: relative;
  background: ${props => colors[props.color].numbersPanel};
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: ${props => (props.itemsCentered ? 'center' : 'space-evenly')};
  align-items: center;
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
  ${props => props.color === 'EndOfGame' && !props.isAlive && 'filter: brightness(60%); color: grey'}
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  box-shadow: 0px 9px 35px -8px rgba(0, 0, 0, 0.49);
  cursor: ${props => (props.pointer ? 'pointer' : 'default')};
  ${props => props.border && `border: 2px solid ${colors.Day.addSecondFoulBackground};`}

  @media (max-width: 404px) {
    height: 25px;
    width: 25px;
    font-size: 0.8rem;
  }

  @media (max-width: 350px) {
    height: 20px;
    width: 20px;
    font-size: 0.7rem;
  }
`;

const PanelText = styled.div`
  color: white;
`;

class NumbersPanel extends Component {
  state = { playerAddedNumber: false };

  componentDidMount = () => {
    const { playerAddedToVotingList } = this.props.game;
    const { activePlayer } = this.props.game;

    const playerMadeStepBack = playerAddedToVotingList[0] === activePlayer;

    if (!this.playerAddedNumber && playerMadeStepBack) this.setState({ playerAddedNumber: true });
  };

  render = () => {
    const {
      gameState: { phase },
      selectedNumbers,
      numbersPanelClickable,
    } = this.props.game;

    const aliveMafiaAmount = this.props.players.filter(
      player => player.isAlive && (player.role === 'ДОН' || player.role === 'МАФИЯ')
    ).length;

    return (
      <>
        {phase === 'SeatAllocator' && (
          <Panel color={phase} className='seat-allocator-panel'>
            {selectedNumbers.map(selNum => (
              <PanelItem color={phase} key={selNum} selected>
                {selNum + 1}
              </PanelItem>
            ))}

            {range(0, 10)
              .filter(e => !selectedNumbers.includes(e))
              .map(notSelNum => (
                <PanelItem color={phase} key={notSelNum} />
              ))}
          </Panel>
        )}

        {phase === 'Day' && (
          <Panel color={phase} className='day-panel'>
            {selectedNumbers.map(selNum => {
              const lastAddedNumber = selNum === last(selectedNumbers) && this.state.playerAddedNumber;

              return (
                <PanelItem
                  color={phase}
                  key={selNum}
                  pointer
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

            {range(0, 10)
              .filter(e => !selectedNumbers.includes(e))
              .map(
                notSelNum =>
                  this.props.players[notSelNum].isAlive && (
                    <PanelItem
                      color={phase}
                      key={notSelNum}
                      pointer
                      border={!this.state.playerAddedNumber}
                      onClick={() => {
                        if (!this.state.playerAddedNumber) {
                          this.props.addToSelectedNumbers(notSelNum);
                        }

                        if (this.state.playerAddedNumber) {
                          this.props.removeLastSelectedNumber();
                          this.props.addToSelectedNumbers(notSelNum);
                        }
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
            {selectedNumbers.map(selNum => (
              <PanelItem color={phase} key={selNum} selected>
                {selNum + 1}
              </PanelItem>
            ))}
          </Panel>
        )}

        {phase === 'Night' && (
          <Panel color={phase}>
            <PanelText>Живых мафов: {aliveMafiaAmount}</PanelText>
          </Panel>
        )}

        {phase === 'EndOfGame' && (
          <Panel color={phase}>
            {this.props.players.map((player, i) => (
              <PanelItem
                isAlive={player.isAlive}
                color={phase}
                key={i}
                selected={player.role === 'ДОН' || player.role === 'МАФИЯ'}
              >
                {player.role === 'ШЕРИФ' ? 'Ш' : player.role === 'ДОН' ? 'Д' : i + 1}
              </PanelItem>
            ))}
          </Panel>
        )}

        {phase === 'RoleDealing' && selectedNumbers.length > 0 && (
          <Panel color={phase} className='role-dealing-panel'>
            {range(0, 10).map(num => (
              <PanelItem
                pointer={numbersPanelClickable}
                color={phase}
                key={num}
                selected={num === selectedNumbers[0]}
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
  ({ game, players, settings }) => ({ game, players, settings }),
  { addToSelectedNumbers, clearSelectedNumbers, removeLastSelectedNumber }
)(NumbersPanel);
