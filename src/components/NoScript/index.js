import React from 'react';
import ReactDOM from 'react-dom/server';

export default function NoScript(props) {
  const staticMarkup = ReactDOM.renderToStaticMarkup(props.children);
  return <noscript dangerouslySetInnerHTML={{__html: staticMarkup}} />;
}
