import React, { Component } from 'react';
import ReactPlayer from 'react-player';

export default class AudioPlayer extends Component {
  render = () => (
    <ReactPlayer
      url="https://www.dropbox.com/s/03dlofceyawifnf/Podcast.mp3?dl=1"
      controls
      height="55px"
      width="400px"
    />
  );
}
