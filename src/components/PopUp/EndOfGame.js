import React, { Component } from 'react';
import { connect } from 'react-redux';

class EndOfGame extends Component {
  render = () => <>end</>;
}

export default connect(({ game, players }) => ({ game, players }))(EndOfGame);
