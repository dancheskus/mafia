import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import colors from '../../colors';
import { MinimizeIcon, MaximizeIcon, EyeIcon, EyeIconCrossed } from './../../img/svgIcons';
import { addFoul, removeFoul } from './../../redux/actions/playersActions';
import { changeGameState } from '../../redux/actions/gameActions';
import PlayerNumber from './style/PlayerNumber';
import FoulContainer from './style/FoulContainer';
import checkForEnd from '../../helpers/checkForEnd';

const CardContainer = styled.div`
  width: 50%;
  display: flex;
  padding: 2px;
  flex-basis: 20%;
  order: ${props => props.order};
`;

const Card = styled.div`
  border-radius: 10px;
  overflow: hidden;
  flex-grow: 1;
  border: 4px solid ${props => (props.activePlayer ? colors.Day.activePlayer : 'transparent')};
  display: flex;
  position: relative;

  span {
    position: absolute;
    left: 5px;
    bottom: 5px;
    width: 10%;

    path {
      fill: ${props =>
        props.isAlive
          ? colors.Night.eyeIconFront
          : props.flipped
          ? colors.Night.eyeIconBackDead
          : colors.Night.eyeIconBack};
    }
  }
`;

const RemoveFoul = styled.div`
  background: ${colors.Day.removeFoulBackground};
`;

const AddFoul = styled.div`
  background: ${props =>
    props.amount === 2
      ? colors.Day.addSecondFoulBackground
      : props.amount === 3 || props.amount === 4
      ? colors.Day.addThirdFoulBackground
      : colors.Day.addFoulBackground};
`;

const FoulIcon = styled.div`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background: ${props => (props.remove ? colors.Day.addFoulBackground : colors.Day.removeFoulBackground)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

class SingleCard extends Component {
  state = { foulsAmount: this.props.players[this.props.number].fouls.amount, cardFlipped: false };

  timer;

  addFoul = () => {
    if (this.state.foulsAmount === 4) return;

    this.setState({ foulsAmount: this.state.foulsAmount + 1 });

    if (this.state.foulsAmount !== 3) return this.props.addFoul(this.props.number);

    this.timer = setTimeout(() => {
      this.props.addFoul(this.props.number);
      checkForEnd(this.props.players) && this.props.changeGameState({ phase: 'EndOfGame' });
    }, 2000);
  };

  removeFoul = () => {
    if (this.state.foulsAmount === 0) return;
    this.setState({ foulsAmount: this.state.foulsAmount - 1 });
    if (this.state.foulsAmount === 4) {
      clearTimeout(this.timer);
    } else {
      this.props.removeFoul(this.props.number);
    }
  };

  render = () => {
    const isMuted = this.props.players[this.props.number].fouls.muted;
    const isAlive = this.props.players[this.props.number].isAlive;
    const phase = this.props.game.gameState.phase;
    const role = this.props.players[this.props.number].role;

    return (
      <CardContainer order={this.props.order}>
        <Card
          flipped={this.state.cardFlipped}
          isAlive={isAlive}
          activePlayer={phase === 'Day' && this.props.game.activePlayer === this.props.number}
        >
          <PlayerNumber
            flipped={this.state.cardFlipped}
            darkSide={role === 'МАФИЯ' || role === 'ДОН'}
            role={role}
            isMuted={isMuted}
            isAlive={isAlive}
            opensTable={phase === 'Day' && this.props.game.opensTable === this.props.number}
          >
            <div className="number">{this.props.number + 1}</div>
          </PlayerNumber>

          <FoulContainer isAlive={isAlive}>
            <RemoveFoul onClick={this.removeFoul}>
              <FoulIcon remove>
                <MinimizeIcon size={'50%'} />
              </FoulIcon>
            </RemoveFoul>

            <AddFoul amount={this.state.foulsAmount} onClick={this.addFoul}>
              {this.state.foulsAmount ? (
                '!'.repeat(this.state.foulsAmount)
              ) : (
                <FoulIcon>
                  <MaximizeIcon size={'50%'} />
                </FoulIcon>
              )}
            </AddFoul>
          </FoulContainer>

          {phase === 'Night' && (
            <>
              <span
                onClick={() => {
                  this.setState({ cardFlipped: !this.state.cardFlipped });
                }}
              >
                {this.state.cardFlipped ? <EyeIconCrossed /> : <EyeIcon />}
              </span>
            </>
          )}
        </Card>
      </CardContainer>
    );
  };
}

export default connect(
  ({ game, players }) => ({ game, players }),
  { addFoul, removeFoul, changeGameState }
)(SingleCard);
