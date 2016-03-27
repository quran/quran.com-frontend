import React from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

class Html extends React.Component {
  render() {
    const { store, component } = this.props;
    const head = Helmet.rewind();

    return (
      <html>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          {Object.keys(this.props.assets.styles).map((style, i) =>
            <link href={this.props.assets.styles[style]} key={i} media="screen, projection"
                  rel="stylesheet" type="text/css"/>)}
        </head>
        <body>
            <div id="app" dangerouslySetInnerHTML={{__html: component}} />

            <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
            {Object.keys(this.props.assets.javascript).map((script, i) =>
              <script src={this.props.assets.javascript[script]} key={i}/>
            )}
        </body>

      </html>
    );
  }
}

export default Html;
