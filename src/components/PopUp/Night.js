import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { killPlayer } from 'redux/actions/playersActions';
import { changeGameState, addToSelectedNumbers } from 'redux/actions/gameActions';
import checkForEnd from 'helpers/checkForEnd';
import { SheriffStarIcon, TargetIcon } from 'icons/svgIcons';
import { PopUpLabel, PopUpButton } from './styled-components';
import VictimSelector from '../common/VictimSelector';
import { NextIcon } from './../../icons/svgIcons';
import colors from './../../colors';

const Sheriff = styled.div`
  width: 70%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    color: white;
    font-size: 5rem;
    position: absolute;

    @media (max-width: 430px) {
      font-size: 3.7rem;
    }
  }
`;

const DarkPlayers = styled.div`
  display: flex;
  height: 50%;
  width: 40%;

  > div:first-child {
    align-self: flex-start;
  }
  > div:last-child {
    align-self: flex-end;
  }
  > div {
    align-self: center;
  }

  @media (max-width: 1300px) {
    width: 45%;
  }
  @media (max-width: 1200px) {
    width: 50%;
  }
  @media (max-width: 1000px) {
    width: 70%;
  }
  @media (max-width: 560px) {
    width: 80%;
  }

  @media (min-height: 700px) {
    height: 40%;
  }
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

const BackButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.Night.popupButton};
  display: flex;
  flex-direction: center;
  justify-content: center;
  padding: 10px;
  transform: rotate(180deg);
  cursor: pointer;
  transition: filter 0.2s !important;
  position: absolute;
  top: 20px;
  left: 20px;

  :hover {
    filter: brightness(110%);
  }

  @media (max-height: 860px) {
    width: 30px;
    height: 30px;
  }
`;

class Night extends Component {
  state = { playerToKill: undefined, donTime: false, sheriffTime: false };

  onNumberSelected = num => this.setState({ playerToKill: num === this.state.playerToKill ? null : num });

  componentWillUnmount = () => {
    if (checkForEnd(this.props.players, [this.state.playerToKill]).status) {
      this.props.killPlayer(this.state.playerToKill);
      this.props.changeGameState({ phase: 'EndOfGame' });
    }
  };

  render = () => {
    if (this.state.sheriffTime)
      return (
        <>
          <BackButton onClick={() => this.setState({ sheriffTime: false })}>
            <NextIcon />
          </BackButton>

          <PopUpLabel color="Night" className="h2">
            Шериф ищет черных игроков
          </PopUpLabel>

          <DarkPlayers>
            {this.props.players
              .map((player, i) => (player.role === 'МАФИЯ' || player.role === 'ДОН' ? i : null))
              .filter(x => x !== null)
              .map(plNum => (
                <Target key={plNum}>
                  <TargetIcon size="100%" />
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
          <BackButton onClick={() => this.setState({ donTime: false, playerToKill: undefined })}>
            <NextIcon />
          </BackButton>

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

        <PopUpButton onClick={() => this.setState({ donTime: true })} color="Night">
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
