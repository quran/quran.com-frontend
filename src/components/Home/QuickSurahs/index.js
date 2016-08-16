import React from 'react';
import debug from '../../../helpers/debug';
import Link from 'react-router/lib/Link';

export default () => {
  debug('component:Index', 'QuickSurahs');

  const isFriday = new Date().getDay() === 5;

  return (
    <span className="pull-right">
      <ul className="list-inline">
        <li>Quick links:</li>
        {
          isFriday &&
            <li>
              <Link
                to="/18"
                data-metrics-event-name="QuickLinks:Click"
                data-metrics-surah-id="18"
              >
                Surah Al-Kahf
              </Link>
              {' '}|
            </li>
        }
        <li>
          <Link
            to="/36"
            data-metrics-event-name="QuickLinks:Click"
            data-metrics-surah-id="36"
          >
            Surah Yasin (Yaseen)
          </Link>{' '}|
        </li>
        <li>
          <Link
            to="/55"
            data-metrics-event-name="QuickLinks:Click"
            data-metrics-surah-id="55"
          >
            Surah Ar-Rahman
          </Link>{' '}|
        </li>

        <li>
          <Link
            to="/67"
            data-metrics-event-name="QuickLinks:Click"
            data-metrics-surah-id="67"
          >
            Surah Al Mulk
          </Link>{' '}|
        </li>
        <li>
          <Link
            to="/2/255"
            data-metrics-event-name="QuickLinks:Click"
            data-metrics-surah-id="2/255"
          >
            Ayat Al-Kursi
          </Link>
        </li>
      </ul>
    </span>);
};
