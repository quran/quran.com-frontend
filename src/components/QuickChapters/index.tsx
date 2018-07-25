import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import T from '../T';
import Title from '../Home/Title';

import { QUICK_LINKS_EVENTS } from '../../events';

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

const QuickChapters: React.SFC<{}> = () => (
  <div>
    <Title muted>
      <T id="surah.index.quickLinks" defaultMessage="Quick links" />
      {__CLIENT__ &&
        isFriday && (
          <Span>
            <Link
              to="/18"
              {...QUICK_LINKS_EVENTS.CLICK.CHAPTER.PROPS}
              data-metrics-chapter-id="18"
            >
              Surah Al-Kahf
            </Link>
          </Span>
        )}
      <Span>
        <Link
          to="/36"
          {...QUICK_LINKS_EVENTS.CLICK.CHAPTER.PROPS}
          data-metrics-chapter-id="36"
        >
          Surah Yasin (Yaseen)
        </Link>
      </Span>
      <Span>
        <Link
          to="/55"
          {...QUICK_LINKS_EVENTS.CLICK.CHAPTER.PROPS}
          data-metrics-chapter-id="55"
        >
          Surah Ar-Rahman
        </Link>
      </Span>
      <Span>
        <Link
          to="/67"
          {...QUICK_LINKS_EVENTS.CLICK.CHAPTER.PROPS}
          data-metrics-chapter-id="67"
        >
          Surah Al Mulk
        </Link>
      </Span>
      <Span>
        <Link
          to="/ayatul-kursi"
          {...QUICK_LINKS_EVENTS.CLICK.VERSE.PROPS}
          data-metrics-verse-key="2:225"
        >
          Ayatul Kursi
        </Link>
      </Span>
    </Title>
  </div>
);

export default QuickChapters;
