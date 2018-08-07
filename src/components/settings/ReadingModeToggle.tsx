import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'quran-components/lib/Menu';
import T, { KEYS } from '../T';

const propTypes = {
  isToggled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

type Props = {
  isToggled: boolean;
  onToggle(payload: { isReadingMode: boolean }): void;
};

const ReadingModeToggle: React.SFC<Props> = ({
  onToggle,
  isToggled,
}: Props) => (
  <MenuItem
    icon={<i className="ss-icon ss-openbook vertical-align-middle" />}
    onClick={() => onToggle({ isReadingMode: !isToggled })}
  >
    <T id={KEYS.SETTING_READING} />
  </MenuItem>
);

ReadingModeToggle.propTypes = propTypes;

export default ReadingModeToggle;
