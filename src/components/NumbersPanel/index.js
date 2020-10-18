import React, { Component } from 'react';
import { connect } from 'react-redux';
import { range, last } from 'lodash';

import { addToSelectedNumbers, clearSelectedNumbers, removeLastSelectedNumber } from 'redux/actions/gameActions';

import { Panel, PanelItem, PanelText } from './style';

class NumbersPanel extends Component {
  state = { playerAddedNumber: false };

  componentDidMount = () => {
    const { playerAddedToVotingList, activePlayer } = this.props.game;

    const playerMadeStepBack = playerAddedToVotingList[0] === activePlayer;

    if (!this.playerAddedNumber && playerMadeStepBack) this.setState({ playerAddedNumber: true });
  };

  render = () => {
    const {
      game: {
        activePlayer,
        gameState: { phase },
        selectedNumbers,
        numbersPanelClickable,
      },
      players,
      removeLastSelectedNumber,
      addToSelectedNumbers,
      clearSelectedNumbers,
    } = this.props;
    const { playerAddedNumber } = this.state;

    const aliveMafiaAmount = players.filter(
      player => player.isAlive && (player.role === 'ДОН' || player.role === 'МАФИЯ')
    ).length;

    const isCurrentPlayerMuted = players[activePlayer].fouls.muted;

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
          <Panel color={phase} className='day-panel' flash={isCurrentPlayerMuted}>
            {selectedNumbers.map(selNum => {
              const lastAddedNumber = selNum === last(selectedNumbers) && playerAddedNumber;

              return (
                <PanelItem
                  color={phase}
                  key={selNum}
                  pointer
                  border={lastAddedNumber}
                  onClick={() => {
                    if (!lastAddedNumber) return;
                    removeLastSelectedNumber();
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
                  players[notSelNum].isAlive && (
                    <PanelItem
                      color={phase}
                      key={notSelNum}
                      pointer
                      border={!playerAddedNumber}
                      onClick={() => {
                        if (!playerAddedNumber) {
                          addToSelectedNumbers(notSelNum);
                        }

                        if (playerAddedNumber) {
                          removeLastSelectedNumber();
                          addToSelectedNumbers(notSelNum);
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
            {players.map((player, i) => (
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
                  clearSelectedNumbers();
                  addToSelectedNumbers(num);
                }}
              >
                {numbersPanelClickable && players[num].role === 'МАФИЯ' && 'М'}
                {numbersPanelClickable && players[num].role === 'ШЕРИФ' && 'Ш'}
                {numbersPanelClickable && players[num].role === 'ДОН' && 'Д'}
                {numbersPanelClickable && players[num].role === 'МИРНЫЙ' && num + 1}
                {!numbersPanelClickable && num + 1}
              </PanelItem>
            ))}
          </Panel>
        )}
      </>
    );
  };
}

export default connect(({ game, players, settings }) => ({ game, players, settings }), {
  addToSelectedNumbers,
  clearSelectedNumbers,
  removeLastSelectedNumber,
})(NumbersPanel);
