var React = require('react');

class Html extends React.Component {
  render() {
    return (
      <html>
      <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
          <meta httpEquiv="Content-Language" content="EN"/>
          <meta name="description" content="The Noble Qur'an in many languages in an easy-to-use interface."/>
          <meta name="keywords" content="quran, koran, qur'an, al quran al kareem, holy, arabic, iman, islam, Allah, book, muslim, english, dutch, french, german, indonesian, italian, japanese, portuguese, russian, spanish, swahili"/>
          <meta name="Charset" content="UTF-8"/>
          <meta name="Distribution" content="Global"/>
          <meta name="Rating" content="General"/>

          <meta property="og:title" content="The Noble Qur'an - القرآن الكريم" />
          <meta property="og:description" content="Quran.com provides the best reading, listening and learning experience for Muslims all around the world." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://quran.com/" />
          <meta property="og:image" content="http://quran.com/images/thumbnail.png" />


          <title>{this.props.context.getStore('ApplicationStore').getPageTitle()}</title>
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
          <link rel="apple-touch-icon" href="/images/apple-touch-icon.png"/>
          <link rel="apple-touch-icon-precomposed" href="/images/apple-touch-icon-precomposed.png" />
          {Object.keys(this.props.assets.styles).map((style, i) =>
            <link href={this.props.assets.styles[style]} key={i} media="screen, projection"
                  rel="stylesheet" type="text/css"/>)}
          {this.props.fontFaces.map(function(font) {
            return (
              <style type="text/css" dangerouslySetInnerHTML={{__html: font}} />
            );
          })}
      </head>
      <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
      </body>
      <script>
        var Keen = {
          addEvent: function() {}
        };
      </script>
      <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
      <script src="https://code.jquery.com/jquery-2.1.4.min.js" />
      <script src="https://fb.me/react-0.14.0.min.js" />
      <script src="https://fb.me/react-dom-0.14.0.min.js" />
      <script src="https://fb.me/react-with-addons-0.14.0.min.js" />
      <script src="https://fb.me/react-dom-0.14.0.min.js" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min.js" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/immutable/3.7.5/immutable.min.js" />
      <script src="https://d26b395fwzu5fz.cloudfront.net/3.2.7/keen.min.js" type="text/javascript"></script>
      {Object.keys(this.props.assets.javascript).map((script, i) =>
        <script src={this.props.assets.javascript[script]} key={i}/>
      )}
      </html>
    );
  }
}

export default Html;
