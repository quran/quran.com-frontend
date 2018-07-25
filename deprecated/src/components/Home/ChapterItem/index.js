import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { chapterType } from 'customPropTypes';

import { CHAPTERS_LIST_EVENTS } from '../../../events';

const Item = styled.li`
  list-style: none;
  color: ${props => props.theme.brandPrimary};

  &:hover {
    background: #f1f1f1;
  }
`;

const Arabic = styled.div`
  font-size: 14px;
`;

const Translated = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  width: ${(10 / 12) * 100}%;
  margin-left: ${(2 / 12) * 100}%;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 10px 10px;
`;

const Table = styled.div`
  display: table;
  width: 100%;
`;

const TableItem = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: ${props => `${props.width * 100}%`};
  ${props => props.textMuted && `text-color: ${props.theme.textMuted};`};
`;

const ChapterItem = ({ chapter }) => (
  <Item key={chapter.id}>
    <StyledLink
      to={`/${chapter.id}`}
      {...CHAPTERS_LIST_EVENTS.CLICK.CHAPTER_LINK.PROPS}
    >
      <Table>
        <TableItem className="text-muted" width={2 / 12}>
          {chapter.chapterNumber}
        </TableItem>
        <TableItem width={7 / 12}>{chapter.nameSimple}</TableItem>
        <TableItem width={3 / 12} className="text-left">
          <Arabic>
            <span className={`icon-surah${chapter.id}`} />
          </Arabic>
        </TableItem>
      </Table>
      <Translated>
        <span
          className={`text-uppercase ${chapter.translatedName.languageName}`}
        >
          {chapter.translatedName.name}
        </span>
      </Translated>
    </StyledLink>
  </Item>
);

ChapterItem.propTypes = {
  chapter: chapterType.isRequired,
};

export default ChapterItem;
