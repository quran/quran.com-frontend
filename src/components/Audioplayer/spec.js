import React from 'react';
import { shallow } from 'enzyme';

import { Audioplayer } from './index';

let makeComponent, component, setRepeat, setAyah, file;

describe('<Audioplayer />', () => {
  describe('#handleRepeat', () => {
    describe('single ayah repeat', () => {
      beforeEach(() => {
        setRepeat = sinon.stub();
        setAyah = sinon.stub();
        file = {
          play: sinon.stub(),
          pause: sinon.stub(),
          currentTime: 100
        };

        makeComponent = (repeat) => {
          component = shallow(
            <Audioplayer
              setRepeat={setRepeat}
              setAyah={setAyah}
              repeat={repeat}
              currentAyah="2:3"
            />
          );

          component.instance().handleAyahChange = sinon.stub();
          component.instance().play = sinon.stub();
        };
      });

      it('should not do anything with no repeat set', () => {
        makeComponent({});
        component.instance().handleRepeat(file);

        expect(component.instance().handleAyahChange).to.have.been.called;
        expect(component.instance().play).not.to.have.been.called;
        expect(setRepeat).not.to.have.been.called;
        expect(setAyah).not.to.have.been.called;
      });

      it('should not do anything when out of range', () => {
        makeComponent({from: 13, to: 13, times: 10});
        component.instance().handleRepeat(file);

        expect(component.instance().handleAyahChange).to.have.been.called;
        expect(setRepeat).not.to.have.been.called;
      });

      it('should repeat current ayah', () => {
        makeComponent({from: 3, to: 3, times: 10});
        component.instance().handleRepeat(file);

        expect(file.pause).to.have.been.called;
        expect(setRepeat).to.have.been.called;
        expect(setRepeat).to.have.been.calledWith({from: 3, to: 3, times: 9});
        expect(file.currentTime).to.eql(0);
        expect(file.play).to.have.been.called;
      });

      it('should not repeat when last time to repeat', () => {
        makeComponent({from: 3, to: 3, times: 1});
        component.instance().handleRepeat(file);

        expect(setRepeat).to.have.been.called;
        expect(setRepeat).to.have.been.calledWith({});
        expect(component.instance().handleAyahChange).to.have.been.called;
      });
    });

    describe('ayah range repeat', () => {
      beforeEach(() => {
        setRepeat = sinon.stub();
        setAyah = sinon.stub();
        file = {
          play: sinon.stub(),
          pause: sinon.stub(),
          currentTime: 100
        };

        makeComponent = (repeat) => {
          component = shallow(
            <Audioplayer
              setRepeat={setRepeat}
              setAyah={setAyah}
              repeat={repeat}
              currentAyah="2:3"
            />
          );

          component.instance().handleAyahChange = sinon.stub();
          component.instance().play = sinon.stub();
        };
      });

      it('should not do anything when out of range', () => {
        makeComponent({from: 7, to: 13, times: 10});
        component.instance().handleRepeat(file);

        expect(component.instance().handleAyahChange).to.have.been.called;
        expect(setRepeat).not.to.have.been.called;
      });

      it('should play next ayah when within range', () => {
        makeComponent({from: 2, to: 5, times: 10});
        component.instance().handleRepeat(file);

        expect(file.pause).to.have.been.called;
        expect(setRepeat).not.to.have.been.called;
        expect(component.instance().handleAyahChange).to.have.been.called;
      });

      it('should start the range from the beginning when at the end', () => {
        makeComponent({from: 1, to: 3, times: 10});
        component.instance().handleRepeat(file);

        expect(file.pause).to.have.been.called;
        expect(setRepeat).to.have.been.called;
        expect(setRepeat).to.have.been.calledWith({from: 1, to: 3, times: 9});
        expect(setAyah).to.have.been.calledWith('2:1');
      });

      it('should not repeat when last time to repeat when range ayah', () => {
        makeComponent({from: 1, to: 3, times: 1});
        component.instance().handleRepeat(file);

        expect(setRepeat).to.have.been.called;
        expect(setRepeat).to.have.been.calledWith({});
        expect(component.instance().handleAyahChange).to.have.been.called;
      });
    });
  });
});
