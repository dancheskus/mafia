import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import colors from '../../colors';
import { MinimizeIcon, MaximizeIcon } from './../../img/svgIcons';
import { addFoul, removeFoul } from './../../redux/actions/playersActions';

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
`;

const PlayerNumber = styled.div`
  background: ${props =>
    !props.isAlive
      ? colors.Day.deadPlayerCardBackground
      : props.isMuted
      ? colors.Day.warningPlayerCardBackground
      : colors.Day.playerCardBackground};
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  color: ${props =>
    !props.isAlive
      ? colors.Day.deadPlayerCardNumber
      : props.isMuted
      ? colors.Day.deadPlayerCardNumber
      : colors.Day.playerCardNumber};
  position: relative;

  ::before {
    content: '';
    width: 13px;
    height: 13px;
    border-radius: 50%;
    filter: blur(3px);
    background: ${props => props.opensTable && colors.Day.playerOpensTable};
    position: absolute;
    top: 7px;
    left: 7px;
  }
`;

const FoulContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  display: ${props => !props.isAlive && 'none'};

  > div {
    width: 100%;
    height: 50%;
    color: white;
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
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
  state = { foulsAmount: this.props.players[this.props.number].fouls.amount };

  timer;

  addFoul = () => {
    if (this.state.foulsAmount === 4) return;

    this.setState({ foulsAmount: this.state.foulsAmount + 1 });

    if (this.state.foulsAmount !== 3) return this.props.addFoul(this.props.number);

    this.timer = setTimeout(() => {
      this.props.addFoul(this.props.number);
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

    return (
      <CardContainer order={this.props.order}>
        <Card activePlayer={this.props.game.activePlayer === this.props.number}>
          <PlayerNumber
            isMuted={isMuted}
            isAlive={isAlive}
            opensTable={this.props.game.opensTable === this.props.number}
          >
            {this.props.number + 1}
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
        </Card>
      </CardContainer>
    );
  };
}

const mapStateToProps = ({ game, players }) => ({ game, players });

const mapDispatchToProps = dispatch => ({
  addFoul: playerNumber => dispatch(addFoul(playerNumber)),
  removeFoul: playerNumber => dispatch(removeFoul(playerNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCard);
