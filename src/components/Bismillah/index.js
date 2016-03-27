import React, { PropTypes } from 'react';

const Bismillah = ({ surah }) => {
  if (surah && surah.bismillahPre) {
    return (
      <div
        className="bismillah text-center word-font"
        style={{textAlign: 'center'}}>
        ﭑﭒﭓ
      </div>
    );
  }

  return <noscript />;
};

Bismillah.propTypes = {
  surah: PropTypes.object.isRequired
};

export default Bismillah;
