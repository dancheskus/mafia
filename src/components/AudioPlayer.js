import React, { Component } from 'react';
import axios from 'axios';
import { shuffle } from 'lodash';
import { connect } from 'react-redux';
import RingLoader from 'react-spinners/RingLoader';
import { Howl } from 'howler';

import { PlayIcon, PauseIcon } from 'icons/svgIcons';
import { NextIcon } from './../icons/svgIcons';
import NavBarCircleButton from './styled-components/NavBarCircleButton';

const musicUrl = 'https://mafia-city.ml/music/';
const fadeDuration = 2000;

class AudioPlayer extends Component {
  state = {
    isPlayingVisualStatus: false,
    songList: [],
    songNumber: 0,
    songLoaded: false,
  };

  loadSong = () => {
    if (this.sound) this.sound.unload();

    this.sound = new Howl({ src: `${musicUrl}${this.state.songList[this.state.songNumber]}` });
    this.sound.play();

    this.sound.on('load', () => this.setState({ songLoaded: true }));
  };

  componentDidMount = () => {
    axios.get('https://mafia-city.ml/music/').then(res => {
      this.setState({ songList: shuffle(res.data.map(el => el.name)) }, () => {
        this.loadSong();
      });
    });

    const phase = this.props.game.gameState.phase;
    const musicAllowed = phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing';
    if (musicAllowed) this.setState({ isPlayingVisualStatus: true });
  };

  componentDidUpdate = prevProps => {
    const prevPhase = prevProps.game.gameState.phase;
    const phase = this.props.game.gameState.phase;
    const musicAllowed = phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing';
    if (prevPhase !== phase) musicAllowed ? this.play() : this.pause();
  };

  playPause = (_, { sound, play, pause } = this) => {
    sound.on('fade', () => sound.volume() === 0 && sound.pause());

    sound.playing() ? pause() : play();
  };

  pause = () => {
    // Ставим на пузу
    this.setState({ isPlayingVisualStatus: false });
    this.sound.fade(this.sound.volume(), 0, fadeDuration);
  };

  play = () => {
    // Воспроизводим
    this.setState({ isPlayingVisualStatus: true });
    this.sound.fade(0, 1, fadeDuration);
    this.sound.play();
  };

  nextSong = () => {
    this.setState(
      {
        songLoaded: false,
        songNumber: (this.state.songNumber + 1) % this.state.songList.length,
      },
      () => this.loadSong()
    );
  };

  render = () => {
    const { phase } = this.props.game.gameState;

    return (
      <>
        {this.state.songList.length && (
          <>
            {(phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing') && (
              <>
                <NavBarCircleButton onClick={this.playPause}>
                  {this.state.songLoaded ? (
                    this.state.isPlayingVisualStatus ? (
                      <PauseIcon />
                    ) : (
                      <PlayIcon />
                    )
                  ) : (
                    <RingLoader sizeUnit={'px'} size={20} color={'white'} />
                  )}
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
