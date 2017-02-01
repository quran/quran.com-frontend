import React, { PropTypes } from 'react';
import debug from 'helpers/debug';
import Link from 'react-router/lib/Link';
import { surahType } from 'types';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const styles = require('containers/Home/style.scss');

const LastVisit = (props) => {
  debug('component:Index', 'LastVisit');
  if (!props.chapter) return false;

  return (
    <div>
      <h4 className={`text-muted ${styles.title}`}>
        <LocaleFormattedMessage id="chapter.index.continue" defaultMessage="Continue" />{' '}
        <Link to={`/${props.chapter.chapterNumber}/${props.ayah}`}>
          <span>
            {props.chapter.nameSimple} ({props.chapter.chapterNumber}:{props.ayah})
          </span>
        </Link>
      </h4>
    </div>
  );
};

LastVisit.propTypes = {
  chapter: surahType.isRequired,
  ayah: PropTypes.number.isRequired
};

export default LastVisit;
