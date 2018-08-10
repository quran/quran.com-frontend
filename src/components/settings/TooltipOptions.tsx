import React from 'react';
import PropTypes from 'prop-types';
import Menu, { MenuItem } from 'quran-components/lib/Menu';
import Radio from 'quran-components/lib/Radio';
import Icon from 'quran-components/lib/Icon';
import T, { KEYS } from '../T';
import { SetSetting } from '../../redux/actions/settings';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  tooltip: PropTypes.string.isRequired,
};

type Props = {
  tooltip: string;
  onChange: SetSetting;
};

const TooltipOptions: React.SFC<Props> = ({ tooltip, onChange }: Props) => {
  const handleOptionChange = (type: string) =>
    onChange({
      tooltip: type,
    });

  const list = ['translation', 'transliteration'].map(type => (
    <MenuItem key={type}>
      <Radio
        id={type}
        name="type"
        checked={type === tooltip}
        handleChange={() => handleOptionChange(type)}
      >
        <T
          id={
            type === 'translation'
              ? KEYS.SETTING_TOOLTIP_TRANSLATION
              : KEYS.SETTING_TOOLTIP_TRANSLITERATION
          }
        />
      </Radio>
    </MenuItem>
  ));

  return (
    <MenuItem icon={<Icon type="globe" />} menu={<Menu>{list}</Menu>}>
      <T id={KEYS.SETTING_TOOLTIP_TITLE} />
    </MenuItem>
  );
};

TooltipOptions.propTypes = propTypes;

export default TooltipOptions;
