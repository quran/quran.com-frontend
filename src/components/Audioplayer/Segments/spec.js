import React from 'react';
import { mount } from 'enzyme';
import Helmet from 'react-helmet';

import Segments from './index';

let component;

describe('<Segments />', () => {
  describe('when are an empty object', () => {
    beforeEach(() => {
      component = mount(
        <Segments segments={{}} />
      );
    });

    it('should not have add any styles', () => {
      expect(component.props()).to.eql({ segments: {} });
    });

    it('should return noscript', () => {
      expect(component.find('noscript').length).to.eql(1);
    });
  });

  describe('when current time within words', () => {
    beforeEach(() => {
      component = mount(
        <Segments
          segments={{ words: { 0: { startTime: 0, endTime: 1 }, 1: { startTime: 1, endTime: 2 } } }}
          currentTime={1.5}
          currentVerse="1:1"
        />
      );
    });

    it('should not contain noscript', () => {
      expect(component.find('noscript').length).to.eql(0);
    });

    it('should render Helmet', () => {
      expect(component.find(Helmet).length).to.eql(1);
    });

    it('should have style for the second word', () => {
      expect(component.find(Helmet).first().props().style[0].cssText).to.contain('#word-1-1-1');
    });
  });

  describe('when current time is outside words', () => {
    beforeEach(() => {
      component = mount(
        <Segments
          segments={{
            words: {
              0: {
                startTime: 0,
                endTime: 1
              },
              1: {
                startTime: 2,
                endTime: 3
              }
            }
          }}
          currentTime={1.5}
          currentVerse="1:1"
        />
      );
    });

    it('should not contain noscript', () => {
      expect(component.find('noscript').length).to.eql(0);
    });

    it('should render Helmet', () => {
      expect(component.find(Helmet).length).to.eql(1);
    });

    it('should not have style words', () => {
      expect(component.find(Helmet).first().props().style).to.have.lengthOf(0);
    });
  });
});
