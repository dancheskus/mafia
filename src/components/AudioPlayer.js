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
  state = { isPlayingVisualStatus: false, audioList: [], audioNumber: 0, audioLoaded: false };

  loadAudio = () => {
    if (this.sound) this.sound.unload();

    this.sound = new Howl({ src: `${musicUrl}${this.state.audioList[this.state.audioNumber]}` });
    this.sound.play();

    this.sound.once('load', () => this.setState({ audioLoaded: true }));
  };

  componentDidMount = () => {
    axios.get('https://mafia-city.ml/music/').then(res => {
      this.setState({ audioList: shuffle(res.data.map(el => el.name)) }, () => {
        this.loadAudio();
        const phase = this.props.game.gameState.phase;
        const musicAllowed = phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing';
        if (musicAllowed) this.play();
      });
    });
  };

  componentDidUpdate = prevProps => {
    const prevPhase = prevProps.game.gameState.phase;
    const phase = this.props.game.gameState.phase;
    const musicAllowed = phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing';
    const musicWasAllowed = prevPhase === 'Night' || prevPhase === 'ZeroNight' || prevPhase === 'RoleDealing';

    if (!musicWasAllowed && musicAllowed) this.play();
    if (musicWasAllowed && !musicAllowed) this.pause();
  };

  playPause = (_, { sound, play, pause } = this) => {
    sound.playing() ? pause() : play();
  };

  pause = () => {
    // Ставим на пузу
    this.setState({ isPlayingVisualStatus: false });
    this.sound.once('fade', () => this.sound.pause());
    this.sound.fade(this.sound.volume(), 0, fadeDuration);
  };

  play = () => {
    // Воспроизводим
    const startPlaying = () => {
      this.setState({ isPlayingVisualStatus: true });
      this.sound.fade(0, 1, fadeDuration);
      this.sound.play();
    };

    if (this.sound.playing()) {
      // Если уже запущено
      this.pause();
      return this.sound.once('pause', () => startPlaying());
    }

    // Если не запущено
    startPlaying();
  };

  nextAudio = () => {
    this.setState(
      {
        audioLoaded: false,
        audioNumber: (this.state.audioNumber + 1) % this.state.audioList.length,
      },
      () => this.loadAudio()
    );
  };

  render = () => {
    const { phase } = this.props.game.gameState;

    return (
      <>
        {this.state.audioList.length && (
          <>
            {(phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing') && (
              <>
                <NavBarCircleButton onClick={this.playPause}>
                  {this.state.audioLoaded ? (
                    this.state.isPlayingVisualStatus ? (
                      <PauseIcon />
                    ) : (
                      <PlayIcon />
                    )
                  ) : (
                    <RingLoader sizeUnit={'px'} size={20} color={'white'} />
                  )}
                </NavBarCircleButton>

                <NavBarCircleButton onClick={this.nextAudio}>
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
