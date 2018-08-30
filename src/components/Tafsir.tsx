import React from 'react';

import Loader from 'quran-components/lib/Loader';
import { TafsirShape, VerseShape } from '../shapes';

const propTypes = {
  tafsir: TafsirShape,
  verse: VerseShape.isRequired,
};

const defaultProps = {
  tafsir: null,
};

type Props = {
  tafsir?: TafsirShape | null;
  verse: VerseShape;
};

const Tafsir: React.SFC<Props> = ({ tafsir, verse }: Props) => {
  if (!tafsir) {
    return <Loader isActive relative />;
  }

  return (
    <div className="col-md-10 col-md-offset-1">
      <h4 className="montserrat">{tafsir.resourceName}</h4>
      <h2 className="text-right">{verse.textMadani}</h2>
      <p
        className={`${tafsir.languageName} text-right`}
        dangerouslySetInnerHTML={{ __html: tafsir.text }}
      />
    </div>
  );
};

Tafsir.propTypes = propTypes;
Tafsir.defaultProps = defaultProps;

export default Tafsir;
