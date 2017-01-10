import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';

const NoScript = (props) => {
  const staticMarkup = ReactDOM.renderToStaticMarkup(props.children);
  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
};

NoScript.propTypes = {
  children: PropTypes.element
};

export default NoScript;
