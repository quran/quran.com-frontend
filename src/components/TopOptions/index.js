import React, { PropTypes } from 'react';

import {Row, Col} from 'react-bootstrap/lib';

import InformationToggle from 'components/InformationToggle';
import FontSizeDropdown from 'components/FontSizeDropdown';
import TooltipDropdown from 'components/TooltipDropdown';
import ReadingModeToggle from 'components/ReadingModeToggle';
import Share from 'components/Share';

const TopOptions = ({options, surah, actions}) => (
  <Row>
    <Col md={6} mdOffset={6} className="text-right">
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
