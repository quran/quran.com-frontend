import React from 'react';
import * as customPropTypes from 'customPropTypes';

const Bismillah = ({ chapter }) => {
  if (chapter && chapter.bismillahPre) {
    return (
      <div
        id="bismillah"
        className="bismillah text-center word-font"
        style={{ textAlign: 'center' }}
        title="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
      >
        ﷽
      </div>
    );
  }

  return <noscript />;
};

Bismillah.propTypes = {
  chapter: customPropTypes.surahType.isRequired
};


export default Bismillah;
