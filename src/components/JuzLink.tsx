import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { JUZ_LIST_EVENTS } from '../events';
import { ChapterShape } from '../shapes';

const Name = styled.span`
  margin-right: 5px;
  font-size: 14px;
`;

const Arabic = styled.div`
  font-size: 14px;
`;

const Translated = styled.div`
  font-size: 10px;
  color: #777;
`;

const Link = styled(RouterLink)`
  display: block;
  padding: 10px 10px;

  &:hover {
    background: #f1f1f1;
  }
`;

type Props = {
  juz: $TsFixMe;
  chapters: { [id: string]: ChapterShape };
};

const JuzLink: React.SFC<Props> = ({ juz, chapters }: Props) => {
  const juzzChapters = Object.keys(juz.verseMapping);

  const list = juzzChapters.map(chapterId => (
    <Translated className="col-md-12" key={chapterId}>
      <Link
        to={`/${chapterId}/${juz.verseMapping[chapterId]}`}
        className="row"
        {...JUZ_LIST_EVENTS.CLICK.JUZ_LINK.PROPS}
      >
        <div className="col-xs-9">
          <Name>{chapters[chapterId].nameSimple}</Name>

          <span className="h5">
            <small>{juz.verseMapping[chapterId]}</small>
          </span>
        </div>
        <Arabic className="col-xs-3 text-left">
          <span className={`icon-surah${chapters[chapterId].id}`} />
        </Arabic>

        <Translated
          className={`col-xs-10 text-uppercase ${
            chapters[chapterId].languageName
          }`}
        >
          <small>{chapters[chapterId].translatedName.name}</small>
        </Translated>
      </Link>
    </Translated>
  ));

  return (
    <div className="col-md-10">
      <div className="row">{list}</div>
    </div>
  );
};

export default JuzLink;
