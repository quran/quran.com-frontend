import React from 'react';

import Line from 'components/Line';
import PageBreak from 'components/PageBreak';

const PageView = ({ lines, keys, currentVerse, options, isPlaying, audioActions }) => {
  const elements = keys.map((lineNum, index) => {
    const nextNum = keys[index + 1];
    const pageNum = lineNum.split('-')[0];
    const line = lines[lineNum];

    if (index + 1 !== keys.length && pageNum !== nextNum.split('-')[0]) {
      return [
        <Line
          line={line}
          key={lineNum}
          currentVerse={currentVerse}
          tooltip={options.tooltip}
          audioActions={audioActions}
          isPlaying={isPlaying}
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
      />
    );
  });

  return (
    <div>{elements}</div>
  );
};

export default PageView;
