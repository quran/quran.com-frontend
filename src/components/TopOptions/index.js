import React, { PropTypes } from 'react';
import Col from 'react-bootstrap/lib/Col';

import InformationToggle from 'components/InformationToggle';
import FontSizeDropdown from 'components/FontSizeDropdown';
import TooltipDropdown from 'components/TooltipDropdown';
import ReadingModeToggle from 'components/ReadingModeToggle';
import NightModeToggle from 'components/NightModeToggle';
import Title from 'containers/Surah/Title';
import Share from 'components/Share';
import { surahType, optionsType } from 'types';

const TopOptions = ({ options, surah, actions }) => (
  <div className="row">
    <Col md={4} className="hidden-xs hidden-sm">
      <Title surah={surah} />
    </Col>
    <Col md={8} className="text-right">
      <ul className="list-inline">
        <li>
          <InformationToggle
            onToggle={actions.setOption}
            isShowingSurahInfo={options.isShowingSurahInfo}
          />
        </li>
        <li>|</li>
        <li>
          <FontSizeDropdown
            options={options}
            onOptionChange={actions.setOption}
          />
        </li>
        <li>|</li>
        <li>
          <TooltipDropdown
            options={options}
            onOptionChange={actions.setOption}
          />
        </li>
        <li>|</li>
        <li>
          <ReadingModeToggle
            isToggled={options.isReadingMode}
            onReadingModeToggle={actions.toggleReadingMode}
          />
        </li>
        <li>|</li>
        <li>
          <NightModeToggle />
        </li>
        <li><Share surah={surah} /></li>
      </ul>
    </Col>
  </div>
);

TopOptions.propTypes = {
  options: optionsType.isRequired,
  surah: surahType.isRequired,
  actions: PropTypes.shape({
    toggleReadingMode: PropTypes.func.isRequired,
    setOption: PropTypes.func.isRequired,
  }).isRequired
};

export default TopOptions;
