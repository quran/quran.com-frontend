import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu, { MenuItem } from 'quran-components/lib/Menu';
import Radio from 'quran-components/lib/Radio';
import Icon from 'quran-components/lib/Icon';
import T, { KEYS } from '../T';
import { ReciterShape } from '../../shapes';
import { SetSetting } from '../../redux/actions/settings';
import { FetchReciters } from '../../redux/actions/options';

const propTypes = {
  setSetting: PropTypes.func.isRequired,
  audioSetting: PropTypes.number.isRequired,
  fetchReciters: PropTypes.func.isRequired,
  recitationsOptions: PropTypes.arrayOf(ReciterShape),
};

const defaultProps: { recitationsOptions: Array<ReciterShape> } = {
  recitationsOptions: [],
};

type Props = {
  setSetting: SetSetting;
  audioSetting: number;
  fetchReciters: FetchReciters;
  recitationsOptions: Array<ReciterShape>;
};

class ReciterDropdown extends Component<Props> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  componentDidMount() {
    const { recitationsOptions, fetchReciters } = this.props;

    if (!recitationsOptions.length) {
      return fetchReciters();
    }

    return false;
  }

  render() {
    const { recitationsOptions, audioSetting, setSetting } = this.props;

    return (
      <MenuItem
        icon={<Icon type="mic" />}
        menu={
          <Menu>
            {recitationsOptions.map(slug => (
              <MenuItem key={slug.id}>
                <Radio
                  checked={slug.id === audioSetting}
                  id={`slug-${slug.id}`}
                  name="reciter"
                  handleChange={() => setSetting({ audio: slug.id })}
                >
                  <span>
                    {slug.reciterNameEng} {slug.style ? `(${slug.style})` : ''}
                  </span>
                </Radio>
              </MenuItem>
            ))}
          </Menu>
        }
      >
        <T id={KEYS.SETTING_RECITERS_TITLE} />
      </MenuItem>
    );
  }
}

export default ReciterDropdown;
