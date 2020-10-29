import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { shuffle } from 'lodash';
import { useSelector } from 'react-redux';
import RingLoader from 'react-spinners/RingLoader';
import useSound from 'use-sound';

import { PlayIcon, PauseIcon, NextIcon } from 'icons/svgIcons';
import NavBarCircleButton from 'components/styled-components/NavBarCircleButton';
import usePreviousState from 'helpers/usePreviousState';

const musicUrl = `https://${process.env.REACT_APP_DOMAIN}/music/`;

const checkMusicAllowedByPhase = phase => phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing';

export default () => {
  const [soundUrl, setSoundUrl] = useState(null);
  const [bufferSoundUrl, setBufferSoundUrl] = useState(null);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [isPlayingVisualStatus, setIsPlayingVisualStatus] = useState(true);
  const [trackNumber, setTrackNumber] = useState(0);
  const [trackList, setTrackList] = useState([]);
  const [listLoadError, setListLoadError] = useState(false);
  // const [musicLoadError, setMusicLoadError] = useState(0);

  const { phase } = useSelector(({ game }) => game.gameState);

  useEffect(() => {
    // fetching tracklist
    axios
      .get(musicUrl)
      .then(({ data }) => setTrackList(shuffle(data.map(({ name }) => musicUrl + name))))
      .catch(() => setListLoadError(true));
  }, []);

  useEffect(() => {
    // changing sound url when tracklist is ready
    if (!trackList.length) return;

    setSoundUrl(`${trackList[trackNumber]}`);
  }, [trackList]);

  const [
    playSound,
    { isPlaying: soundIsPlaying, pause: pauseSound, stop: stopSound, duration: soundReady, sound },
  ] = useSound(soundUrl, {
    onload: () => {
      // setMusicLoadError(0);
      setSoundLoaded(true);
      setBufferSoundUrl(`${trackList[(trackNumber + 1) % trackList.length]}`);
    },
    onplay: () => setIsPlayingVisualStatus(true),
    onpause: () => setIsPlayingVisualStatus(false),
    onend: () => nextTrack(), // eslint-disable-line no-use-before-define
    onloaderror: () => {
      // if (!soundUrl) return;
      // console.log('load error', musicLoadError);
      // if (musicLoadError === 3) return nextTrack();
      // setMusicLoadError(musicLoadError + 1);
      setSoundUrl(`${trackList[trackNumber]}`);
      // nextTrack();
    },
  });
  const [, { sound: bufferSound }] = useSound(bufferSoundUrl);
  const nextSoundLoaded = bufferSound?.state() === 'loaded';

  const prevPhaseState = usePreviousState(phase);
  useEffect(() => {
    const musicAllowed = checkMusicAllowedByPhase(phase);
    const musicWasAllowed = checkMusicAllowedByPhase(prevPhaseState);

    if (!musicWasAllowed && musicAllowed) playSound();
    if (musicWasAllowed && !musicAllowed) pauseSound();
  });

  useEffect(() => {
    // Unloading sound on unmount
    return () => sound && sound.unload();
  }, [sound]);

  useEffect(() => {
    // Unloading bufferSound on unmount
    return () => bufferSound && bufferSound.unload();
  }, [bufferSound]);

  useEffect(() => {
    // start music autoplay if sound is ready and music is allowed
    checkMusicAllowedByPhase(phase) && soundReady && playSound();
  }, [soundReady]);

  useEffect(() => {
    soundLoaded && nextSoundLoaded && setSoundLoaded(true);
  }, [soundLoaded, nextSoundLoaded]);

  const nextTrack = () => {
    if (!soundLoaded) return;

    const newTrackNumber = (trackNumber + 1) % trackList.length;
    stopSound();
    !nextSoundLoaded && setSoundLoaded(false);
    setSoundUrl(`${trackList[newTrackNumber]}`);
    setTrackNumber(newTrackNumber);
  };

  const togglePlay = () => (soundIsPlaying ? pauseSound() : playSound());
  const PlayPauseIcon = () => (isPlayingVisualStatus ? <PauseIcon /> : <PlayIcon />);

  return (
    <>
      {listLoadError && 'Музыка не доступна'}

      {/* {musicLoadError === 4 && 'Ошибка загрузки музыки'} */}

      {trackList.length > 0 && (
        <>
          {checkMusicAllowedByPhase(phase) && (
            <>
              <NavBarCircleButton onClick={togglePlay} className='audio-player-pause-play'>
                {soundLoaded ? <PlayPauseIcon /> : <RingLoader sizeUnit='px' size={20} color='white' />}
              </NavBarCircleButton>

              <NavBarCircleButton onClick={nextTrack} className='audio-player-next'>
                <NextIcon size='60%' />
              </NavBarCircleButton>
            </>
          )}
        </>
      )}
    </>
  );
};

// import React, { Component } from 'react';
// import axios from 'axios';
// import { shuffle } from 'lodash';
// import { connect } from 'react-redux';
// import RingLoader from 'react-spinners/RingLoader';
// import { Howl } from 'howler';

// import { PlayIcon, PauseIcon, NextIcon } from 'icons/svgIcons';
// import NavBarCircleButton from 'components/styled-components/NavBarCircleButton';

// const musicUrl = `https://${process.env.REACT_APP_DOMAIN}/music/`;

// const checkMusicAllowedByPhase = phase => phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing';

// class AudioPlayer extends Component {
//   state = { isPlayingVisualStatus: false, audioList: [], audioNumber: 0, audioLoaded: false, loadError: false };

//   loadAudio = () => {
//     const { audioNumber, audioList } = this.state;

//     if (this.sound) this.sound.unload();

//     this.sound = new Howl({
//       src: `${musicUrl}${audioList[audioNumber]}`,
//       onend: () => this.nextAudio(),
//     });

//     if (this.soundForBuffering) this.soundForBuffering.unload();

//     this.soundForBuffering = new Howl({
//       src: `${musicUrl}${audioList[(audioNumber + 1) % audioList.length]}`,
//     });

//     const { phase } = this.props.game.gameState;
//     if (checkMusicAllowedByPhase(phase)) this.play();

//     this.sound.once('load', () => this.setState({ audioLoaded: true }));
//   };

//   componentDidMount = () => {
//     axios
//       .get(musicUrl)
//       .then(res => {
//         this.setState({ audioList: shuffle(res.data.map(({ name }) => name)), loadError: false }, this.loadAudio);
//       })
//       .catch(() => this.setState({ loadError: true }));
//   };

//   componentWillUnmount = () => {
//     this.sound && this.sound.unload();
//     this.soundForBuffering && this.soundForBuffering.unload();
//   };

//   componentDidUpdate = prevProps => {
//     if (this.state.loadError) return;

//     const prevPhase = prevProps.game.gameState.phase;
//     const { phase } = this.props.game.gameState;
//     const musicAllowed = checkMusicAllowedByPhase(phase);
//     const musicWasAllowed = checkMusicAllowedByPhase(prevPhase);

//     if (!musicWasAllowed && musicAllowed) this.play();
//     if (musicWasAllowed && !musicAllowed) this.pause();
//   };

//   playPause = (_, { sound, play, pause } = this) => {
//     sound.playing() ? pause() : play();
//   };

//   pause = () => {
//     // Ставим на пузу
//     this.setState({ isPlayingVisualStatus: false });
//     this.sound.pause();
//   };

//   play = () => {
//     // Воспроизводим
//     const startPlaying = () => {
//       this.setState({ isPlayingVisualStatus: true });
//       this.sound.play();
//     };

//     if (this.sound.playing()) {
//       // Если уже запущено
//       this.pause();
//       return this.sound.once('pause', () => startPlaying());
//     }

//     // Если не запущено
//     startPlaying();
//   };

//   nextAudio = () => {
//     const { audioLoaded, audioNumber, audioList } = this.state;

//     if (!audioLoaded) return;

//     const nextAudioLoaded = this.soundForBuffering && this.soundForBuffering.state() === 'loaded';

//     this.setState(
//       {
//         audioLoaded: !!nextAudioLoaded,
//         audioNumber: (audioNumber + 1) % audioList.length,
//       },
//       () => this.loadAudio()
//     );
//   };

//   render = () => {
//     const { phase } = this.props.game.gameState;
//     const { loadError, audioList, audioLoaded, isPlayingVisualStatus } = this.state;

//     return (
//       <>
//         {loadError && 'Музыка не доступна'}

//         {audioList.length > 0 && (
//           <>
//             {checkMusicAllowedByPhase(phase) && (
//               <>
//                 <NavBarCircleButton onClick={this.playPause} className='audio-player-pause-play'>
//                   {audioLoaded ? (
//                     isPlayingVisualStatus ? (
//                       <PauseIcon />
//                     ) : (
//                       <PlayIcon />
//                     )
//                   ) : (
//                     <RingLoader sizeUnit='px' size={20} color='white' />
//                   )}
//                 </NavBarCircleButton>

//                 <NavBarCircleButton onClick={this.nextAudio} className='audio-player-next'>
//                   <NextIcon size='60%' />
//                 </NavBarCircleButton>
//               </>
//             )}
//           </>
//         )}
//       </>
//     );
//   };
// }

// export default connect(({ game }) => ({ game }))(AudioPlayer);
