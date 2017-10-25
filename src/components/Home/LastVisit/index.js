import React, { PropTypes } from 'react';
import * as customPropTypes from 'customPropTypes';
import debug from 'helpers/debug';
import Link from 'react-router/lib/Link';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import Title from 'components/Home/Title';

const LastVisit = ({ chapter, verse }) => {
  debug('component:Index', 'LastVisit');
  if (!chapter) return false;

  return (
    <Title className="text-muted">
      <LocaleFormattedMessage
        id="surah.index.continue"
        defaultMessage="Continue"
      />{' '}
      <Link to={`/${chapter.chapterNumber}/${verse}`}>
        <span>
          {chapter.nameSimple} (
          {chapter.chapterNumber}
          :
          {verse}
          )
        </span>
      </Link>
    </Title>
  );
};

LastVisit.propTypes = {
  chapter: customPropTypes.surahType.isRequired,
  verse: PropTypes.number.isRequired
};

export default LastVisit;
