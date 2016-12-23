import React, { PropTypes } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import InformationToggle from 'components/InformationToggle';
import FontSizeDropdown from 'components/FontSizeDropdown';
import TooltipDropdown from 'components/TooltipDropdown';
import ReadingModeToggle from 'components/ReadingModeToggle';
import NightModeToggle from 'components/NightModeToggle';
import Title from 'containers/Surah/Title';
import Share from 'components/Share';

const TopOptions = ({ options, surah, actions }) => (
  <Row>
    <Col md={4} className="hidden-xs hidden-sm">
      <Title surah={surah} />
    </Col>
    <Col md={8} className="text-right">
      <ul className="list-inline">
        <li>
          <InformationToggle
            onToggle={actions.options.setOption}
            isShowingSurahInfo={options.isShowingSurahInfo}
          />
        </li>
        <li>|</li>
        <li>
          <FontSizeDropdown
            options={options}
            onOptionChange={actions.options.setOption}
          />
        </li>
        <li>|</li>
        <li>
          <TooltipDropdown
            options={options}
            onOptionChange={actions.options.setOption}
          />
        </li>
        <li>|</li>
        <li>
          <ReadingModeToggle
            isToggled={options.isReadingMode}
            onReadingModeToggle={actions.options.toggleReadingMode}
          />
        </li>
        <li>|</li>
        <li>
          <NightModeToggle />
        </li>
        <li><Share surah={surah} /></li>
      </ul>
    </Col>
  </Row>
);

TopOptions.propTypes = {
  options: PropTypes.object.isRequired,
  surah: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default TopOptions;
