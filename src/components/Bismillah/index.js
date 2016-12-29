import React from 'react';
import { surahType } from 'types';

const Bismillah = ({ surah }) => {
  if (surah && surah.bismillahPre) {
    return (
      <div
        className="bismillah text-center word-font"
        style={{ textAlign: 'center' }}
      >
        ﭑﭒﭓ
      </div>
    );
  }

  return <noscript />;
};

Bismillah.propTypes = {
  surah: surahType.isRequired
};

export default Bismillah;
