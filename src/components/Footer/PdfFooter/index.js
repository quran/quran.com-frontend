import React from 'react';
import { Link } from 'react-router-dom';

const PdfFooter = () => (
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <p className="text-center">
            This PDF is exported from {' '}
            <Link to="https://quran.com">Quran.com</Link>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default PdfFooter;
