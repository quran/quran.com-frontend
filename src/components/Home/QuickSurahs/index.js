import React from 'react';
import Link from 'react-router/lib/Link';
import styled from 'styled-components';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import { Title } from 'containers/Home';

const Span = styled.span`
  &:after {
    content: '|';
  }
  &:first-child,
  &:last-child {
    &:after {
      content: none;
    }
  }
`;

const isFriday = new Date().getDay() === 5;

export default () => (
  <div className="">
    <Title className="text-muted">
      <LocaleFormattedMessage
        id="surah.index.quickLinks"
        defaultMessage="Quick links"
      />
      {isFriday && (
        <Span>
          <Link
            to="/18"
            data-metrics-event-name="QuickLinks:Click"
            data-metrics-surah-id="18"
          >
            Surah Al-Kahf
          </Link>
        </Span>
      )}
      <Span>
        <Link
          to="/36"
          data-metrics-event-name="QuickLinks:Click"
          data-metrics-surah-id="36"
        >
          Surah Yasin (Yaseen)
        </Link>
      </Span>
      <Span>
        <Link
          to="/55"
          data-metrics-event-name="QuickLinks:Click"
          data-metrics-surah-id="55"
        >
          Surah Ar-Rahman
        </Link>
      </Span>

      <Span>
        <Link
          to="/67"
          data-metrics-event-name="QuickLinks:Click"
          data-metrics-surah-id="67"
        >
          Surah Al Mulk
        </Link>
      </Span>
      <Span>
        <Link
          to="/ayatul-kursi"
          data-metrics-event-name="QuickLinks:Click"
          data-metrics-surah-id="ayatul-kursi"
        >
          Ayatul Kursi
        </Link>
      </Span>
    </Title>
  </div>
);
