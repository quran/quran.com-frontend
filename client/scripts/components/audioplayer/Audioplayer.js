'use strict';

import React from 'react';
import AudioplayerStore from 'stores/AudioplayerStore';
import AudioplayerTrack from './AudioplayerTrack';
import VersesDropdown from './VersesDropdown';
import AyahsActions from 'actions/AyahsActions';
import {connectToStores} from 'fluxible/addons'
import SurahsStore from 'stores/SurahsStore';
import AyahsStore from 'stores/AyahsStore';

class Audioplayer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      // surah: this.context.getStore('SurahStore').getSurah(),
      playing: false,
      shouldRepeat: false,
      progress: 0,
      currentTime: 0,
      currentAudio: null,
      currentAyah: null
    };
  }

  // _ayahsReceived() {
  //   let currentAyah = this.context.getStore('AyahsStore').getAyahs()[0];
  //
  //   this._setupAudio(currentAyah);
  // }

  _ayahChanged() {
    // var currentAyah = this.getStore(AyatStore).getAyahs().find((a) => {
    //   return this.getStore(AudioplayerStore).getCurrentAyah()  === a.ayah;
    // });

    // If the ayah is beyond the range
    if (currentAyah === undefined) {
      if (this.getParams().range) {
        var rangeArray = this.getParams().range.split('-');
      } else {
        var rangeArray = [1, 10];
      }

      var range = rangeArray.map(x => parseInt(x)),
          spread = range[1] - range[0],
          fromAyah = this.getStore(AudioplayerStore).getCurrentAyah(),
          toAyah = fromAyah + spread;

      // this.transitionTo(
      //     '/' + this.getParams().surahId + '/' + fromAyah + '-' + toAyah);

      // AyahsActions.getAyahs(this.context.dispatcher, {
      //     surahId: this.getParams().surahId,
      //     from: fromAyah,
      //     to: toAyah,
      //     shouldReplace: true
      // });
      return;

    }

    this._setupAudio(currentAyah);
  }

  _changeOffset(fraction) {
    this.setState({
        progress: fraction * 100,
        currentTime: fraction * this.state.currentAudio.duration
    });

    this.state.currentAudio.currentTime = fraction *
        this.state.currentAudio.duration;
  }

  _setupAudio(currentAyah) {
      var continueToPlay;

      if (this.state.playing) {
          this._pause();
          continueToPlay = true;
      }

      var currentAudio = currentAyah.scopedAudio;

      // Default current time to zero. This will change
      currentAudio.currentTime = 0;

      currentAudio.addEventListener('timeupdate', function() {
          let progress = (this.state.currentAudio.currentTime /
                          this.state.currentAudio.duration * 100);
          this.setState({
              progress: progress
          });
          console.log('asdkas')
      }.bind(this), false);

      currentAudio.addEventListener('ended', function() {
          if (this.state.shouldRepeat === true) {
              this._setupAudio(this.state.currentAyah);
          } else {
              var currentAyah = this.getStore(AyatStore).getAyahs().find((a) => {
                  return (this.state.currentAyah.ayah + 1)  === a.ayah;
              });

              this._setupAudio(currentAyah);
          }
      }.bind(this), false);

      currentAudio.addEventListener('play', function() {
          let currentTime = (this.state.progress /
                             100 * this.state.currentAudio.duration);
          this.setState({
              currentTime: currentTime
          });
      }.bind(this), false);

      this.setState({
          surah: this.getStore(SurahStore).getSurah(),
          currentAyah: currentAyah,
          currentAudio: currentAudio,
      });

      if (this.state.shouldRepeat ||
          continueToPlay ||
          this.getStore(AudioplayerStore).shouldPlay()) {
          this._play();
      }
  }

  _startStopPlayer(e) {
      e.preventDefault();
      console.log('Audio was playing:', this.state.playing);

      if (this.state.playing) {
          this._pause();
      } else {
          this._play();
      }

  }

  _pause() {
      this.setState({
          playing: false
      });
      this.state.currentAudio.pause();
  }

  _play() {
      this.setState({
          playing: true
      });
      this.state.currentAudio.play();
  }

  _repeatSwitch() {
      this.setState({
          shouldRepeat: !this.state.shouldRepeat
      });
  }

  _forwardAyah(e) {
      e.preventDefault();

      var currentAyah = this.getStore(AyatStore).getAyahs().find((a) => {
        return (this.state.currentAyah.ayah + 1)  === a.ayah;
      });

      this._setupAudio(currentAyah);
  }

  // UI components

  _playStopButtons() {
      var icon;
      if (this.state.playing) {
          icon = <i className="fa fa-pause" />;
      } else {
          icon = <i className="fa fa-play" />;
      }
      return (
          <li className="audioplayer-controls">
              <a className="buttons" onClick={this._startStopPlayer} href>
                {icon}
              </a>
          </li>
      );
  }

  _forwardButton() {
      return (
          <li className="text-center audioplayer-controls">
            <a href className="buttons" onClick={this._forwardAyah}>
              <i className="fa fa-fast-forward" />
            </a>
          </li>
      );
  }

  _repeatButton() {
      var classes = React.addons.classSet({
          repeat: this.state.shouldRepeat
      });

      return (
          <li className="text-center audioplayer-repeat">
            <a href>
              <input type="checkbox" id="repeat" />
              <label htmlFor="repeat"
                     onClick={this._repeatSwitch}
                     className={classes}>
                <i className="fa fa-repeat" />
              </label>
            </a>
          </li>
      );
  }

  render() {
      var currentAyahId = this.state.currentAyah ?
                          this.state.currentAyah.ayah :
                          '';
                          console.log('Audioplayer Init')
      return (
        <div className="audioplayer col-md-2">
          <ul className="list-inline audioplayer-options">
             <VersesDropdown ayahs={this.props.surah ? this.props.surah.ayat : 1}
                             currentAyah={currentAyahId}/>
            {this._playStopButtons()}
            {this._forwardButton()}
            {this._repeatButton()}
          </ul>
          <div className="audioplayer-wrapper">
            <AudioplayerTrack progress={this.state.progress}
                              changeOffset={this._changeOffset}/>
          </div>
        </div>
      );
  }

}

Audioplayer.contextTypes = {
  getStore: React.PropTypes.func.isRequired
};

Audioplayer = connectToStores(Audioplayer, [SurahsStore, AyahsStore], function(stores, props) {
  return {
    surah: stores.SurahsStore.getSurah(),
    ayahs: stores.AyahsStore.getAyahs()
  }
})

export default Audioplayer;
