import React, { Component } from 'react';
// import ReactPlayer from 'react-player';
import axios from 'axios';
import { shuffle } from 'lodash';
import { connect } from 'react-redux';
import ReactHowler from 'react-howler';

import { PlayIcon, PauseIcon } from 'icons/svgIcons';
import { NextIcon } from './../icons/svgIcons';
import NavBarCircleButton from './styled-components/NavBarCircleButton';

const musicUrl = 'https://mafia-city.ml/music/';

class AudioPlayer extends Component {
  state = { volume: 1, isPlaying: false, isPlayingVisualStatus: false, songList: [], songNumber: 0 };

  componentDidMount = () => {
    axios.get('https://mafia-city.ml/music/').then(res => {
      this.setState({ songList: shuffle(res.data.map(el => el.name)) });
    });

    const phase = this.props.game.gameState.phase;
    const musicAllowed = phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing';
    if (musicAllowed) this.setState({ isPlaying: true, isPlayingVisualStatus: true });
  };

  componentDidUpdate = prevProps => {
    const prevPhase = prevProps.game.gameState.phase;
    const phase = this.props.game.gameState.phase;
    const musicAllowed = phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing';
    if (prevPhase !== phase) musicAllowed ? this.play() : this.pause();
  };

  playPause = () => (this.state.isPlayingVisualStatus ? this.pause() : this.play());

  play = () => {
    clearInterval(this.volumeDown);
    this.setState({ volume: 0, isPlaying: true, isPlayingVisualStatus: true });

    this.volumeUp = setInterval(() => {
      if (this.state.volume > 0.97) {
        clearInterval(this.volumeUp);
      }
      this.setState({ volume: this.state.volume + 0.01 });
    }, 20);
  };

  pause = () => {
    clearInterval(this.volumeUp);
    this.setState({ isPlayingVisualStatus: false });

    this.volumeDown = setInterval(() => {
      if (this.state.volume < 0.02) {
        clearInterval(this.volumeDown);
        this.setState({ isPlaying: false });
      }
      this.setState({ volume: this.state.volume - 0.01 });
    }, 20);
  };

  nextSong = () => {
    this.setState({ songNumber: (this.state.songNumber + 1) % this.state.songList.length });
  };

  render = () => {
    const { phase } = this.props.game.gameState;

    return (
      <>
        {this.state.songList.length && (
          <>
            {/* <ReactPlayer
              url={`${musicUrl}${this.state.songList[this.state.songNumber]}`}
              playing={this.state.isPlaying}
              height="0px"
              width="0px"
              volume={this.state.volume}
              onEnded={this.nextSong}
            /> */}

            <ReactHowler
              src={`${musicUrl}${this.state.songList[this.state.songNumber]}`}
              playing={this.state.isPlaying}
              volume={this.state.volume}
            />

            {(phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing') && (
              <>
                <NavBarCircleButton onClick={this.playPause}>
                  {this.state.isPlayingVisualStatus ? <PauseIcon /> : <PlayIcon />}
                </NavBarCircleButton>

                <NavBarCircleButton onClick={this.nextSong}>
                  <NextIcon size="60%" />
                </NavBarCircleButton>
              </>
            )}
          </>
        )}
      </>
    );
  };
}

export default connect(({ game }) => ({ game }))(AudioPlayer);
