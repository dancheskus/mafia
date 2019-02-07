import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { shuffle } from 'lodash';
import { connect } from 'react-redux';

const musicUrl = 'https://mafia-city.ml/music/';

class AudioPlayer extends Component {
  state = { volume: 1, isPlaying: false, songList: [], songNumber: 0 };

  componentDidMount = () => {
    axios.get('https://mafia-city.ml/music/').then(res => {
      this.setState({ songList: shuffle(res.data.map(el => el.name)) });
    });

    const phase = this.props.game.gameState.phase;
    const musicAllowed = phase === 'Night' || phase === 'ZeroNight';
    if (musicAllowed) this.setState({ isPlaying: true });
  };

  componentDidUpdate = prevProps => {
    const prevPhase = prevProps.game.gameState.phase;
    const phase = this.props.game.gameState.phase;
    const musicAllowed = phase === 'Night' || phase === 'ZeroNight';
    if (prevPhase !== phase && musicAllowed) this.setState({ isPlaying: true });
    if (!musicAllowed && this.state.isPlaying) this.setState({ isPlaying: false });
  };

  playPause = () => this.setState({ isPlaying: !this.state.isPlaying });

  nextSong = () => {
    this.setState({ songNumber: (this.state.songNumber + 1) % this.state.songList.length });
  };

  render = () => {
    const { phase } = this.props.game.gameState;

    return (
      <>
        {this.state.songList.length && (
          <>
            <ReactPlayer
              url={`${musicUrl}${this.state.songList[this.state.songNumber]}`}
              playing={this.state.isPlaying}
              // controls
              height="0px"
              width="0px"
              volume={this.state.volume}
              onEnded={this.nextSong}
            />

            {(phase === 'Night' || phase === 'ZeroNight') && (
              <>
                <button onClick={this.playPause}>{this.state.isPlaying ? 'PAUSE' : 'PLAY'}</button>
                <button onClick={this.nextSong}>NEXT SONG</button>
              </>
            )}
          </>
        )}
      </>
    );
  };
}

export default connect(({ game }) => ({ game }))(AudioPlayer);
