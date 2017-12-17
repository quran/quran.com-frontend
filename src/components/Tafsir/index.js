import React from 'react';
import * as customPropTypes from 'customPropTypes';
import Loader from 'quran-components/lib/Loader';

const Tafsir = ({ tafsir, verse }) => {
  if (!tafsir) {
    return <Loader isActive relative />;
  }

  return (
    <div className="col-md-10 col-md-offset-1">
      <h4 className="montserrat">
        {tafsir.resourceName}
      </h4>
      <h2 className="text-right">
        {verse.textMadani}
      </h2>
      <p
        className={`${tafsir.languageName} text-right`}
        dangerouslySetInnerHTML={{ __html: tafsir.text }}
      />
    </div>
  );
};

Tafsir.propTypes = {
  tafsir: customPropTypes.tafsirType.isRequired,
  verse: customPropTypes.verseType
};

export default Tafsir;
