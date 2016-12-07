import React from 'react';
import debug from 'helpers/debug';
import Link from 'react-router/lib/Link';

const styles = require('containers/Home/style.scss');

export default () => {
  debug('component:Index', 'QuickSurahs');

  const isFriday = new Date().getDay() === 5;

  return (
    <div className="">
      <h4 className={`text-muted ${styles.title}`}>
        <span>Quick links:</span>
        {
          isFriday &&
            <span>
              <Link
                to="/18"
                data-metrics-event-name="QuickLinks:Click"
                data-metrics-surah-id="18"
              >
                Surah Al-Kahf
              </Link>
            </span>
        }
        <span>
          <Link
            to="/36"
            data-metrics-event-name="QuickLinks:Click"
            data-metrics-surah-id="36"
          >
            Surah Yasin (Yaseen)
          </Link>
        </span>
        <span>
          <Link
            to="/55"
            data-metrics-event-name="QuickLinks:Click"
            data-metrics-surah-id="55"
          >
            Surah Ar-Rahman
          </Link>
        </span>

        <span>
          <Link
            to="/67"
            data-metrics-event-name="QuickLinks:Click"
            data-metrics-surah-id="67"
          >
            Surah Al Mulk
          </Link>
        </span>
        <span>
          <Link
            to="/2/255"
            data-metrics-event-name="QuickLinks:Click"
            data-metrics-surah-id="2/255"
          >
            Ayat Al-Kursi
          </Link>
        </span>
      </h4>
    </div>);
};
