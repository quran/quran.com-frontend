import React from 'react';
import Helmet from 'react-helmet';

class Html extends React.Component {
  render() {
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
          {this.props.fontFaces.map(function(font, i) {
            return (
              <style type="text/css" dangerouslySetInnerHTML={{__html: font}} key={i} />
            );
          })}
        </head>
        <body>
            <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
            <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
            {Object.keys(this.props.assets.javascript).map((script, i) =>
              <script src={this.props.assets.javascript[script]} key={i}/>
            )}
        </body>

      </html>
    );
  }
}

export default Html;
