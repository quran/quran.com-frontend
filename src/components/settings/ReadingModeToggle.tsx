import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'quran-components/lib/Menu';
import T, { KEYS } from '../T';
import { SetSetting } from '../../redux/actions/settings';

const propTypes = {
  isToggled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

type Props = {
  isToggled: boolean;
  onToggle: SetSetting;
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
