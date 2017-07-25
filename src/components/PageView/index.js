import React from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import { connect } from 'react-redux';

import Line from 'components/Line';
import PageBreak from 'components/PageBreak';

const PageView = ({ lines, keys, currentVerse, options, isPlaying, audioActions, userAgent }) => { // eslint-disable-line
  const elements = keys.map((lineNum, index) => {
    const nextNum = keys[index + 1];
    const pageNum = lineNum.split('-')[0];
    const line = lines[lineNum];
    const renderText = false; // userAgent.isBot;

    if (index + 1 !== keys.length && pageNum !== nextNum.split('-')[0]) {
      return [
        <Line
          line={line}
          key={lineNum}
          currentVerse={currentVerse}
          tooltip={options.tooltip}
          audioActions={audioActions}
          isPlaying={isPlaying}
          useTextFont={renderText}
        />,
        <PageBreak pageNum={parseInt(pageNum, 10) + 1} />
      ];
    }

    return (
      <Line
        line={line}
        key={lineNum}
        currentVerse={currentVerse}
        tooltip={options.tooltip}
        audioActions={audioActions}
        isPlaying={isPlaying}
        useTextFont={renderText}
      />
    );
  });

  return (
    <div>{elements}</div>
  );
};

PageView.propTypes = {
  keys: PropTypes.array, // eslint-disable-line
  lines: PropTypes.object.isRequired, // eslint-disable-line
  audioActions: customPropTypes.audioActions.isRequired, // eslint-disable-line
  currentVerse: PropTypes.string,
  bookmarks: PropTypes.object.isRequired, // eslint-disable-line
  options: PropTypes.object.isRequired, // eslint-disable-line
  isPlaying: PropTypes.bool,
  userAgent: PropTypes.func
};

export default connect(state => ({
  userAgent: state.options.userAgent
}))(PageView);
