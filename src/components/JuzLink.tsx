import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { JUZ_LIST_EVENTS } from '../events';
import { ChapterShape } from '../shapes';
import JuzShape from '../shapes/JuzShape';
import ChapterIcon from './ChapterIcon';

const Name = styled.span`
  margin-right: 5px;
  font-size: 14px;
`;

const Arabic = styled.div`
  font-size: 14px;
`;

const Translated = styled.div`
  font-size: 10px;
`;

const Link = styled(RouterLink)`
  display: block;
  padding: 10px 10px;

  &:hover {
    background: #f1f1f1;
  }
`;

const Table = styled.div`
  display: table;
  width: 100%;
`;

const TableItem = styled.div<{ width: number }>`
  display: table-cell;
  vertical-align: middle;
  width: ${({ width }) => `${width * 100}%`};
`;

type Props = {
  juz: JuzShape;
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
        <Table>
          <TableItem width={9 / 12}>
            <Name>{chapters[chapterId].nameSimple}</Name>

            <span className="h5">
              <small>{juz.verseMapping[chapterId]}</small>
            </span>
          </TableItem>

          <TableItem width={3 / 12}>
            <Arabic>
              <ChapterIcon id={String(chapterId)} />
            </Arabic>
          </TableItem>
        </Table>

        <Translated>
          <span
            className={`text-uppercase ${
              chapters[chapterId].translatedName.languageName
            }`}
          >
            {chapters[chapterId].translatedName.name}
          </span>
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
