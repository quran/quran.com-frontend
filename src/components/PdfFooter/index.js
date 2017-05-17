import React from 'react';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

const styles = require('./style.scss');

const PdfFooter = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <p>
            <LocaleFormattedMessage
              id="export.promotion"
              defaultMessage="This PDF is exported from Quran.com"
            />
          </p>

          <p className="monserrat">
            <LocaleFormattedMessage
              id="nav.aboutQuranProject"
              defaultMessage="QURAN.COM (ALSO KNOWN AS THE NOBLE QURAN, AL QURAN, HOLY QURAN, KORAN) IS A PRO BONO PROJECT."
            />
            <LocaleFormattedMessage
              id="nav.rightsReserved"
              defaultMessage="All Rights Reserved"
            />
            .
            {' '}
            © 2016 Quran.com.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default PdfFooter;
