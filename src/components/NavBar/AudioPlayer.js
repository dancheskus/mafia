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

const useUnloadSoundOnUnmount = sound => {
  useEffect(() => {
    return () => sound && sound.unload();
  }, [sound]);
};

export default () => {
  const [soundUrl, setSoundUrl] = useState(null);
  const [bufferSoundUrl, setBufferSoundUrl] = useState(null);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [isPlayingVisualStatus, setIsPlayingVisualStatus] = useState(true);
  const [trackNumber, setTrackNumber] = useState(0);
  const [trackList, setTrackList] = useState([]);
  const [trackListLoadError, setTrackListLoadError] = useState(false);
  // const [musicLoadError, setMusicLoadError] = useState(0);

  const { phase } = useSelector(({ game }) => game.gameState);
  const nextTrackNumber = (trackNumber + 1) % trackList.length;

  useEffect(() => {
    // fetching tracklist
    axios
      .get(musicUrl)
      .then(({ data }) => setTrackList(shuffle(data.map(({ name }) => musicUrl + name))))
      .catch(() => setTrackListLoadError(true));
  }, []);

  useEffect(() => {
    // changing sound url when tracklist is ready
    if (!trackList.length) return;

    setSoundUrl(`${trackList[trackNumber]}`);
  }, [trackList]); // eslint-disable-line react-hooks/exhaustive-deps

  const [
    playSound,
    { isPlaying: soundIsPlaying, pause: pauseSound, stop: stopSound, duration: soundReady, sound },
  ] = useSound(soundUrl, {
    onload: () => {
      // setMusicLoadError(0);
      setSoundLoaded(true);
      setBufferSoundUrl(`${trackList[nextTrackNumber]}`);
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
    if (trackListLoadError) return;

    const musicAllowed = checkMusicAllowedByPhase(phase);
    const musicWasAllowed = checkMusicAllowedByPhase(prevPhaseState);

    if (!musicWasAllowed && musicAllowed) playSound();
    if (musicWasAllowed && !musicAllowed) pauseSound();
  });

  useUnloadSoundOnUnmount(sound);
  useUnloadSoundOnUnmount(bufferSound);

  useEffect(() => {
    // start music autoplay if sound is ready and music is allowed
    checkMusicAllowedByPhase(phase) && soundReady && playSound();
  }, [soundReady]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    soundLoaded && nextSoundLoaded && setSoundLoaded(true);
  }, [soundLoaded, nextSoundLoaded]);

  const nextTrack = () => {
    if (!soundLoaded) return;

    stopSound();
    !nextSoundLoaded && setSoundLoaded(false);
    setSoundUrl(`${trackList[nextTrackNumber]}`);
    setTrackNumber(nextTrackNumber);
  };

  const togglePlay = () => (soundIsPlaying ? pauseSound() : playSound());
  const PlayPauseIcon = () => (isPlayingVisualStatus ? <PauseIcon /> : <PlayIcon />);

  return (
    <>
      {trackListLoadError && 'Музыка не доступна'}

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
