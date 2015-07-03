import React from 'react';
import IndexHeader from 'components/header/IndexHeader';

class NotFound extends React.Component {
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


          <title>Page not found.</title>
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" />
          <link rel="stylesheet" href={'build/main.css'} />
      </head>
      <body>
      <div>
        <IndexHeader navlink={false} noSearch={true} />
        <div className="container-fluid about-text">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 text-center">
              <h2>
                Cannot find page requested.
              </h2>
              <p>
                Are you sure it's the right one? Here is a list of pages you can visit:
              </p>
              <ul className="text-left col-md-8 col-md-offset-2">
                <li>
                  Contributes: /donations or /contributions
                </li>
                <li>
                  About: /about
                </li>
                <li>
                  Contact: /contact
                </li>
                <li>
                  Surah: /SURAH_ID/AYAH_RANGE eg. /2/50-60
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </body>
      </html>
    );
  }
}

export default NotFound;
