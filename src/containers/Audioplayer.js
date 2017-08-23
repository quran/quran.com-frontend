import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';
import * as customPropTypes from 'customPropTypes';

import { buildAudioForAyah } from 'helpers/buildAudio';

import Player from 'components/Audioplayer';

class Audioplayer extends Component {
  constructor(props) {
    super(props);

    this.currentFile = null;
  }

  componentWillReceiveProps(nextProps) {
    const { data, audio } = this.props;
    const { data: nextData, audio: nextAudio } = nextProps;

    if (nextData.audioFile) {
      if (
        (!data.audioFile && nextData.audioFile) ||
        data.audioFile.url !== nextData.audioFile.url ||
        audio !== nextAudio
      ) {
        this.setCurrentFile(nextData.audioFile);
      }
    }
  }

  componentWillUnmount() {
    this.removeCurrentFile();
  }

  setCurrentFile = (data) => {
    const { audio: currentFile, segments } = buildAudioForAyah(data);

    if (this.currentFile) {
      this.removeCurrentFile();
    }

    this.currentFile = currentFile;
    this.segments = segments;
  };

  removeCurrentFile() {
    this.currentFile.pause();
    this.currentFile.src = '';
    this.currentFile.currentTime = 0; // eslint-disable-line no-param-reassign
    this.currentFile.onloadeddata = null; // eslint-disable-line no-param-reassign
    this.currentFile.ontimeupdate = null; // eslint-disable-line no-param-reassign
    this.currentFile.onplay = null; // eslint-disable-line no-param-reassign
    this.currentFile.onPause = null; // eslint-disable-line no-param-reassign
    this.currentFile.onended = null; // eslint-disable-line no-param-reassign
    this.currentFile.onprogress = null; // eslint-disable-line no-param-reassign
    this.currentFile = null;
  }

  render() {
    const { data, currentVerse, chapter, verses } = this.props;

    if (!data.audioFile || !this.currentFile) {
      return <noscript />;
    }

    return (
      <Player
        chapter={chapter}
        currentFile={this.currentFile}
        segments={this.segments}
        currentVerse={currentVerse}
        verses={verses}
      />
    );
  }
}

Audioplayer.propTypes = {
  data: PropTypes.object, // eslint-disable-line
  chapter: customPropTypes.surahType,
  currentVerse: PropTypes.verseType,
  audio: PropTypes.number.isRequired,
  verses: customPropTypes.verses
};

const GraphAudioplayer = graphql(
  gql`
  query AudioFile($recitationId: ID!, $resourceId: ID!) {
    audioFile(recitationId: $recitationId, resourceId: $resourceId) {
      id
      url
      resourceId
    }
  }
`,
  {
    options: ({ currentVerse, audio }) => ({
      ssr: false,
      variables: { recitationId: audio, resourceId: currentVerse.id }
    })
  }
)(Audioplayer);

export default GraphAudioplayer;
