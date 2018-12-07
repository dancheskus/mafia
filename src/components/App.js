import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addRole, killPlayer, addFoul, removeFoul } from '../redux/actions/playersActions';
import { changeGameState } from '../redux/actions/gameActions';

class App extends Component {
  render() {
    return (
      <div>
        {this.props.players[0].fouls.amount}
        {this.props.players[0].fouls.muted.toString()}
        {this.props.players[0].isAlive.toString()}
        <button className="btn btn-primary" onClick={() => this.props.addFoul(0)}>
          test
        </button>
        <button className="btn btn-primary" onClick={() => this.props.removeFoul(0)}>
          test2
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players,
  game: state.game,
});

const mapDispatchToProps = dispatch => ({
  changeGameState: payload => dispatch(changeGameState(payload)),
  addRole: payload => dispatch(addRole(payload)),
  killPlayer: playerNumber => dispatch(killPlayer(playerNumber)),
  addFoul: playerNumber => dispatch(addFoul(playerNumber)),
  removeFoul: playerNumber => dispatch(removeFoul(playerNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
