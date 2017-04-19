import React, { PropTypes } from 'react';
import * as customPropTypes from 'customPropTypes';
import debug from 'helpers/debug';
import Link from 'react-router/lib/Link';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const styles = require('containers/Home/style.scss');

const LastVisit = (props) => {
  debug('component:Index', 'LastVisit');
  if (!props.chapter) return false;

  return (
    <div>
      <h4 className={`text-muted ${styles.title}`}>
        <LocaleFormattedMessage id="surah.index.continue" defaultMessage="Continue" />{' '}
        <Link to={`/${props.chapter.chapterNumber}/${props.verse}`}>
          <span>
            {props.chapter.nameSimple} ({props.chapter.chapterNumber}:{props.verse})
          </span>
        </Link>
      </h4>
    </div>
  );
};

LastVisit.propTypes = {
  chapter: customPropTypes.surahType.isRequired,
  verse: PropTypes.number.isRequired
};

export default LastVisit;
