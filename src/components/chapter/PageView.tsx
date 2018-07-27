import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Line from '../Line';
import PageBreak from '../PageBreak';
import { LineShape } from '../../shapes';

const propTypes = {
  lines: PropTypes.objectOf(LineShape),
};

type Props = {
  lines: { [key: string]: LineShape };
};

const defaultProps: Props = {
  lines: null,
};

const PageView: React.SFC<Props> = ({ lines }: Props) => {
  const keys = Object.keys(lines);
  const elements = keys.map((lineNum, index) => {
    const nextNum = keys[index + 1];
    const pageNum = lineNum.split('-')[0];
    const line = lines[lineNum];
    const renderText = false; // userAgent.isBot;

    if (index + 1 !== keys.length && pageNum !== nextNum.split('-')[0]) {
      return [
        <Line line={line} key={lineNum} useTextFont={renderText} />,
        <PageBreak key={lineNum} pageNum={parseInt(pageNum, 10) + 1} />,
      ];
    }

    return <Line line={line} key={lineNum} useTextFont={renderText} />;
  });

  return <Fragment>{elements}</Fragment>;
};

PageView.propTypes = propTypes;
PageView.defaultProps = defaultProps;

export default PageView;
