import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { killPlayer } from 'redux/actions/playersActions';
import { changeGameState, addToSelectedNumbers } from 'redux/actions/gameActions';
import checkForEnd from 'helpers/checkForEnd';
import { SheriffStarIcon, TargetIcon } from 'icons/svgIcons';
import { PopUpLabel, PopUpButton } from './styled-components';
import VictimSelector from '../common/VictimSelector';

const Sheriff = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    color: white;
    font-size: 5rem;
    position: absolute;
  }
`;

const DarkPlayers = styled.div`
  display: flex;
`;

const Target = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    color: white;
    font-size: 2rem;
    position: absolute;
  }
`;

class Night extends Component {
  state = { playerToKill: undefined, donTime: false, sheriffTime: false };

  onNumberSelected = num => this.setState({ playerToKill: num === this.state.playerToKill ? null : num });

  componentWillUnmount = () => {
    checkForEnd(this.props.players).status && this.props.changeGameState({ phase: 'EndOfGame' });
  };

  killPlayer = () => {
    this.state.playerToKill >= 0 && this.props.killPlayer(this.state.playerToKill);
    this.setState({ donTime: true });
  };

  render = () => {
    if (this.state.sheriffTime)
      return (
        <>
          <PopUpLabel color="Night" className="h2">
            Шериф ищет черных игроков
          </PopUpLabel>
          <DarkPlayers>
            {this.props.players
              .map((player, i) => (player.role === 'МАФИЯ' || player.role === 'ДОН' ? i : null))
              .filter(x => x !== null)
              .map(plNum => (
                <Target key={plNum}>
                  <TargetIcon size="85%" />
                  <span>{plNum + 1}</span>
                </Target>
              ))}
          </DarkPlayers>

          <PopUpButton
            onClick={() => {
              this.state.playerToKill >= 0 && this.props.addToSelectedNumbers(this.state.playerToKill);
              this.props.changeGameState({ phase: 'Day', dayNumber: this.props.game.gameState.dayNumber + 1 });
            }}
            color="Night"
          >
            День
          </PopUpButton>
        </>
      );

    if (this.state.donTime)
      return (
        <>
          <PopUpLabel color="Night" className="h2">
            Дон ищет шерифа
          </PopUpLabel>

          <Sheriff>
            <SheriffStarIcon />
            <span>{this.props.players.findIndex(player => player.role === 'ШЕРИФ') + 1}</span>
          </Sheriff>

          <PopUpButton onClick={() => this.setState({ sheriffTime: true })} color="Night">
            Далее
          </PopUpButton>
        </>
      );

    return (
      <>
        <PopUpLabel color="Night" className="h2">
          В кого стреляет мафия?
        </PopUpLabel>

        <VictimSelector shooting onNumberSelected={this.onNumberSelected} />

        <PopUpButton onClick={this.killPlayer} color="Night">
          Далее
        </PopUpButton>
      </>
    );
  };
}

export default connect(
  ({ game, players }) => ({ game, players }),
  { killPlayer, changeGameState, addToSelectedNumbers }
)(Night);
