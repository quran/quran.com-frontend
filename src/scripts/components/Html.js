'use strict';
var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');

class Html extends React.Component {
  render() {
    return (
      <html>
      <head>
          <meta charSet="utf-8" />
          <title>{this.props.context.getStore(ApplicationStore).getPageTitle()}</title>
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
          <link rel="stylesheet" href={this.props.hotModuleUrl + 'build/main.css'} />
          {this.props.fontFaces.map(function(font) {
            return (
              <style type="text/css" dangerouslySetInnerHTML={{__html: font}} />
            )
          })}
      </head>
      <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
      </body>
      <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
      <script src={this.props.hotModuleUrl + 'build/main.js'}></script>
      </html>
    );
  }
}

module.exports = Html;
