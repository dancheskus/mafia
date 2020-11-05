import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { shuffle } from 'lodash';
import { useSelector } from 'react-redux';
import RingLoader from 'react-spinners/RingLoader';
import useSound from 'use-sound';

import useOnMount from 'helpers/useOnMount';
import { PlayIcon, PauseIcon, NextIcon } from 'icons/svgIcons';
import NavBarCircleButton from 'components/styled-components/NavBarCircleButton';
import usePreviousState from 'helpers/usePreviousState';
import { useCustomRef } from 'helpers/useCustomRef';
import { gameSelector } from 'redux/selectors';

const musicUrl = `https://${process.env.REACT_APP_DOMAIN}/music/`;

const checkMusicAllowedByPhase = phase => phase === 'Night' || phase === 'ZeroNight' || phase === 'RoleDealing';

const useUnloadSoundOnUnmount = sound => {
  useEffect(() => {
    return () => sound && sound.unload();
  }, [sound]);
};

export default () => {
  const [bufferSoundUrl, setBufferSoundUrl] = useState();
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [isPlayingVisualStatus, setIsPlayingVisualStatus] = useState(true);
  const [trackList, setTrackList] = useState([]);
  const [trackListLoadError, setTrackListLoadError] = useState(false);
  const [musicLoadError, setMusicLoadError] = useState(0);
  const [trackNumber, setTrackNumber] = useState();
  const soundUrl = trackList?.[trackNumber];
  const [nextSoundLoadedRef, setNextSoundLoadedRef] = useCustomRef();

  const { phase } = useSelector(gameSelector).gameState;

  const nextTrackNumber = trackNumber !== undefined && (trackNumber + 1) % trackList.length;

  useOnMount(() => {
    // fetching tracklist
    axios
      .get(musicUrl)
      .then(({ data }) => {
        setTrackList(shuffle(data.map(({ name }) => musicUrl + name)));
        setTrackNumber(0);
      })
      .catch(() => setTrackListLoadError(true));
  });

  const prevPhaseState = usePreviousState(phase);
  const musicAllowed = checkMusicAllowedByPhase(phase);
  const musicWasAllowed = checkMusicAllowedByPhase(prevPhaseState);

  let nextTrack;

  const [
    playSound,
    { isPlaying: soundIsPlaying, pause: pauseSound, stop: stopSound, duration: soundReady, sound },
  ] = useSound(soundUrl, {
    onload: () => {
      setMusicLoadError(0);
      setBufferSoundUrl(trackList[nextTrackNumber]);
    },
    onplay: () => {
      setSoundLoaded(true);
      setIsPlayingVisualStatus(true);
    },
    onpause: () => setIsPlayingVisualStatus(false),
    onend: () => nextTrack(),
    onloaderror: () => {
      if (!soundUrl || musicLoadError === 3) return;

      setMusicLoadError(musicLoadError + 1);
      nextTrack();
    },
  });
  const [, { sound: bufferSound }] = useSound(bufferSoundUrl, {
    onload: () => {
      if (nextSoundLoadedRef === undefined || nextSoundLoadedRef === trackNumber) {
        setNextSoundLoadedRef(nextTrackNumber);
      }
    },
  });

  useEffect(() => {
    if (trackListLoadError) return;

    if (!musicWasAllowed && musicAllowed) playSound();
    if (musicWasAllowed && !musicAllowed) pauseSound();
  });

  useUnloadSoundOnUnmount(sound);
  useUnloadSoundOnUnmount(bufferSound);

  useEffect(() => {
    // soundReady && sound.seek(sound.duration() - 10); // for development. Finding last track seconds

    // start music autoplay if sound is ready and music is allowed
    musicAllowed && soundReady && playSound();
  }, [soundReady]); // eslint-disable-line react-hooks/exhaustive-deps

  nextTrack = () => {
    nextSoundLoadedRef !== nextTrackNumber && soundLoaded && setSoundLoaded(false);

    // prevent multiple times button click
    if (sound?.state() === 'loading') return;

    stopSound();
    trackNumber !== undefined && setTrackNumber(nextTrackNumber);
  };

  const togglePlay = () => (soundIsPlaying ? pauseSound() : playSound());
  const PlayPauseIcon = () => (isPlayingVisualStatus ? <PauseIcon /> : <PlayIcon />);

  if (trackListLoadError) return 'Музыка не доступна';
  if (musicLoadError === 3) return 'Ошибка загрузки музыки';
  if (trackList.length > 0 && musicAllowed)
    return (
      <>
        <NavBarCircleButton onClick={togglePlay} className='audio-player-pause-play'>
          {soundLoaded ? <PlayPauseIcon /> : <RingLoader sizeUnit='px' size={20} color='white' />}
        </NavBarCircleButton>

        <NavBarCircleButton onClick={nextTrack} className='audio-player-next'>
          <NextIcon size='60%' />
        </NavBarCircleButton>
      </>
    );
  return null;
};
