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

const InformationToggle: React.SFC<Props> = ({
  isToggled,
  onToggle,
}: Props) => (
  <MenuItem
    icon={<i className="ss-icon ss-info vertical-align-middle" />}
    onClick={() => onToggle({ isShowingChapterInfo: !isToggled })}
  >
    <T id={KEYS.CHAPTER_INFO} />
  </MenuItem>
);

InformationToggle.propTypes = propTypes;

export default InformationToggle;
