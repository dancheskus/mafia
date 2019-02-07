import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

const regex = />.+(?=\.mp3)/g;

const url = 'https://mafia-city.ml/music/';

export default class AudioPlayer extends Component {
  state = { volume: 1, isPlaying: false, songList: [], songName: '' };

  getRandomSong = list => list[Math.floor(Math.random() * list.length)];

  componentWillMount = () => {
    axios.get('https://mafia-city.ml/music/').then(res => {
      const songList = res.data.match(regex).map(name => name.substr(1));
      console.log(songList);
      this.setState({ songList, songName: this.getRandomSong(songList) });
    });
  };

  playPause = () => this.setState({ isPlaying: !this.state.isPlaying });
  nextSong = () => this.setState({ songName: this.getRandomSong(this.state.songList) });

  render = () => (
    <>
      <ReactPlayer
        url={`${url}${this.state.songName}.mp3`}
        playing={this.state.isPlaying}
        // controls
        height="55px"
        width="400px"
        volume={this.state.volume}
      />
      <button onClick={this.playPause}>{this.state.isPlaying ? 'PAUSE' : 'PLAY'}</button>
      <button onClick={this.nextSong}>NEXT SONG</button>
    </>
  );
}
