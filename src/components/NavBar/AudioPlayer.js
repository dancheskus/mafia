import React, { Component } from 'react';
import axios from 'axios';
import { shuffle } from 'lodash';
import { connect } from 'react-redux';
import RingLoader from 'react-spinners/RingLoader';
import { Howl } from 'howler';

import { PlayIcon, PauseIcon, NextIcon } from 'icons/svgIcons';
import NavBarCircleButton from 'components/styled-components/NavBarCircleButton';

const musicUrl = `https://${process.env.REACT_APP_DOMAIN}/music/`;

class AudioPlayer extends Component {
  state = { isPlayingVisualStatus: false, audioList: [], audioNumber: 0, audioLoaded: false, loadError: false };

  loadAudio = () => {
    if (this.sound) this.sound.unload();

    this.sound = new Howl({
      src: `${musicUrl}${this.state.audioList[this.state.audioNumber]}`,
      onend: () => this.nextAudio(),
    });

    if (this.soundForBuffering) this.soundForBuffering.unload();

    this.soundForBuffering = new Howl({
      src: `${musicUrl}${this.state.audioList[(this.state.audioNumber + 1) % this.state.audioList.length]}`,
    });

    const { phase } = this.props.game.gameState;
    const musicAllowed = phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing';
    if (musicAllowed) this.play();

    this.sound.once('load', () => this.setState({ audioLoaded: true }));
  };

  componentDidMount = () => {
    axios
      .get(musicUrl)
      .then(res => {
        this.setState({ audioList: shuffle(res.data.map(el => el.name)), loadError: false }, () => {
          this.loadAudio();
        });
      })
      .catch(() => this.setState({ loadError: true }));
  };

  componentWillUnmount = () => {
    this.sound && this.sound.unload();
    this.soundForBuffering && this.soundForBuffering.unload();
  };

  componentDidUpdate = prevProps => {
    if (this.state.loadError) return;

    const prevPhase = prevProps.game.gameState.phase;
    const { phase } = this.props.game.gameState;
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
    this.sound.pause();
  };

  play = () => {
    // Воспроизводим
    const startPlaying = () => {
      this.setState({ isPlayingVisualStatus: true });
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
    if (!this.state.audioLoaded) return;

    const nextAudioLoaded = this.soundForBuffering && this.soundForBuffering.state() === 'loaded';

    this.setState(
      {
        audioLoaded: !!nextAudioLoaded,
        audioNumber: (this.state.audioNumber + 1) % this.state.audioList.length,
      },
      () => this.loadAudio()
    );
  };

  render = () => {
    const { phase } = this.props.game.gameState;
    const { loadError, audioList, audioLoaded, isPlayingVisualStatus } = this.state;

    return (
      <>
        {loadError && 'Музыка не доступна'}
        {audioList.length > 0 && (
          <>
            {(phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing') && (
              <>
                <NavBarCircleButton onClick={this.playPause} className='audio-player-pause-play'>
                  {audioLoaded ? (
                    isPlayingVisualStatus ? (
                      <PauseIcon />
                    ) : (
                      <PlayIcon />
                    )
                  ) : (
                    <RingLoader sizeUnit='px' size={20} color='white' />
                  )}
                </NavBarCircleButton>

                <NavBarCircleButton onClick={this.nextAudio} className='audio-player-next'>
                  <NextIcon size='60%' />
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
