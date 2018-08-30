/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/html-has-lang */

import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  htmlAttributes?: $TsFixMe;
  headerElements?: $TsFixMe;
  bodyElements?: $TsFixMe;
  appBodyString: string;
};

const HTML: React.SFC<Props> = ({
  htmlAttributes,
  headerElements,
  bodyElements,
  appBodyString,
}: Props) => (
  <html {...htmlAttributes}>
    <head>{headerElements}</head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: appBodyString }} />
      {bodyElements}
    </body>
  </html>
);

HTML.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  htmlAttributes: PropTypes.object,
  headerElements: PropTypes.node,
  bodyElements: PropTypes.node,
  appBodyString: PropTypes.string,
};

HTML.defaultProps = {
  htmlAttributes: null,
  headerElements: null,
  bodyElements: null,
  appBodyString: '',
};

export default HTML;
