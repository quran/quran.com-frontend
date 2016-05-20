import React from 'react';
import { Link } from 'react-router';
import debug from '../../../helpers/debug';

import classNames from 'classnames';

const SurahsNav = ({ surahs, className }) => {
  const list = surahs.map((surah, index) => {
    return (
      <li key={`surah-${index}`}>
        <Link to={`/${surah.id}`} activeClass="active">
          <div className="row">
            <div className="col-md-2 col-xs-2">
              <span className="surah-num">
                {surah.id}
              </span>
            </div>
            <div className="col-md-7 col-xs-7">
              <span className="suran-name">{surah.name.simple}</span>
              <br />
              <span className="surah-meaning">{surah.name.english}</span>
            </div>
            <div className="col-md-3 col-xs-3 text-right">
              {surah.name.arabic}
            </div>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <div className={`${className} surahs-nav col-md-12 col-xs-12`}>
      <ul>
        {list}
      </ul>
    </div>
  );
};

export default SurahsNav;
