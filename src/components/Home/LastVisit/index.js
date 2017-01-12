import React, { PropTypes } from 'react';
import debug from 'helpers/debug';
import Link from 'react-router/lib/Link';
import { surahType } from 'types';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const styles = require('containers/Home/style.scss');

const LastVisit = (props) => {
  debug('component:Index', 'LastVisit');
  return (
    <div>
      <h4 className={`text-muted ${styles.title}`}>
        <LocaleFormattedMessage id="surah.index.continue" defaultMessage="Continue" />{' '}
        <Link to={`/${props.surah.id}/${props.ayah}`}>
          <span>
            {props.surah.name.simple} ({props.surah.id}:{props.ayah})
          </span>
        </Link>
      </h4>
    </div>
  );
};

LastVisit.propTypes = {
  surah: surahType.isRequired,
  ayah: PropTypes.number.isRequired
};

export default LastVisit;
