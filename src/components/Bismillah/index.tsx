import React from 'react';
import { ChapterShape } from '../../shapes';

type Props = {
  chapter: ChapterShape,
};

const Bismillah: React.SFC<Props> = ({ chapter }: Props) => {
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

  return null;
};

Bismillah.propTypes = {
  chapter: ChapterShape.isRequired,
};

export default Bismillah;
