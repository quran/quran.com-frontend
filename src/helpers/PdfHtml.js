/* eslint-disable global-require, quotes, max-len */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';

const PdfHtml = ({ component, assets }) => {
  const content = component ? ReactDOM.renderToString(component) : '';
  const head = Helmet.rewind();

  return (
    <html lang="en">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {head.style.toComponent()}

        {Object.keys(assets.styles).map((style, i) => (
          <link
            href={assets.styles[style]}
            key={i}
            rel="stylesheet"
            type="text/css"
          />
        ))}
        {Object.keys(assets.styles).length === 0
          ? <style
            dangerouslySetInnerHTML={{
              __html: require('../../src/styles/bootstrap.config')
            }}
          />
          : null}
        {Object.keys(assets.javascript).map((script, i) => (
          <script src={assets.javascript[script]} key={i} />
        ))}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
      </body>
    </html>
  );
};

PdfHtml.propTypes = {
  store: PropTypes.object, // eslint-disable-line
  assets: PropTypes.object, // eslint-disable-line
  component: PropTypes.element
};

export default PdfHtml;
