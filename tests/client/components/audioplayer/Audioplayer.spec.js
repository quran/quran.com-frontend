import {createMockComponentContext} from 'fluxible/utils';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Audioplayer from 'components/audioplayer/Audioplayer';
import provideContext from 'fluxible-addons-react/provideContext';
import SurahsStore from 'stores/SurahsStore';
import AyahsStore from 'stores/AyahsStore';
import AudioplayerStore from 'stores/AudioplayerStore';

import getSurahs from '../../../fixtures/getSurahs';
import getAyahs from '../../../fixtures/getAyahs';
import AudioStub from '../../../helpers/AudioStub';

let component, node, makeComponent, context, clock, foundComponent;

describe('Audioplayer', function() {
  beforeEach(function() {
    clock = sinon.useFakeTimers();

    context = createMockComponentContext({
      stores: [AudioplayerStore, SurahsStore, AyahsStore]
    });

    context.getStore('SurahsStore').surahs = getSurahs;
    context.getStore('AyahsStore').ayahs = getAyahs;
    context.getStore('AudioplayerStore').currentAyah = getAyahs[0];
    context.getStore('AudioplayerStore').currentAudio = new AudioStub(getAyahs[0].audio.mp3.url);

    var AudioplayerClass = provideContext(Audioplayer);

    component = ReactTestUtils.renderIntoDocument(
      <AudioplayerClass context={context}  />
    );

    node = React.findDOMNode(component);

    foundComponent = ReactTestUtils.findAllInRenderedTree(component, function(t) {
      return t.constructor.name === 'Audioplayer';
    })[0];

    sinon.stub(context, 'executeAction');
    sinon.stub(foundComponent, 'changeAyah');
    sinon.stub(foundComponent, 'loadRestOfAudio');
  });

  afterEach(function() {
    context.executeAction.restore();
    foundComponent.changeAyah.restore();
    foundComponent.loadRestOfAudio.restore();
  });

  it('should render', function() {
    expect(node).to.exist;
  });

  it('should have audio loaded', function() {
    expect(node.querySelector('.ss-play')).not.to.exist;
    expect(node.querySelector('.sequence')).to.exist;
    clock.tick(1000);
    expect(node.querySelector('.ss-play')).to.exist;
    expect(node.querySelector('.sequence')).not.to.exist;
  });

  it('should play audio', function(done) {
    clock.tick(1000);
    ReactTestUtils.Simulate.click(node.querySelector('.ss-play'));

    expect(node.querySelector('.ss-play')).not.to.exist;
    expect(node.querySelector('.ss-pause')).to.exist;

    foundComponent.props.currentAudio.pause();
    done();
  });

  it('should load rest of audio on first play', function(done) {
    clock.tick(1000);
    ReactTestUtils.Simulate.click(node.querySelector('.ss-play'));

    expect(foundComponent.loadRestOfAudio).to.have.been.called;

    foundComponent.props.currentAudio.pause();
    done();
  });

  it('should pause audio', function() {
    clock.tick(1000);
    ReactTestUtils.Simulate.click(node.querySelector('.ss-play'));
    ReactTestUtils.Simulate.click(node.querySelector('.ss-pause'));

    expect(node.querySelector('.ss-play')).to.exist;
    expect(node.querySelector('.ss-pause')).not.to.exist;
  });

  it('should forward one ayah', function() {
    clock.tick(1000);
    ReactTestUtils.Simulate.click(node.querySelector('.ss-play'));
    ReactTestUtils.Simulate.click(node.querySelector('.ss-skipforward'));

    expect(foundComponent.changeAyah).to.be.called;
    expect(foundComponent.changeAyah.args[0][0]).to.eql(2);
    expect(foundComponent.changeAyah.args[0][1]).to.eql(true);
    expect(node.querySelector('.ss-play')).to.exist;
  });

  it('should have progress', function(done) {
    clock.tick(1000);
    ReactTestUtils.Simulate.click(node.querySelector('.ss-play'));

    clock.tick(500);

    expect(foundComponent.state.progress).to.eql(50);
    foundComponent.props.currentAudio.pause();
    done();
  });

  it('should play next ayah when finished', function(done) {
    clock.tick(1000);
    ReactTestUtils.Simulate.click(node.querySelector('.ss-play'));

    clock.tick(1001);

    expect(foundComponent.changeAyah.args[0][0]).to.eql(2);
    expect(foundComponent.changeAyah.args[0][1]).to.eql(true);
    foundComponent.props.currentAudio.pause();
    done();
  });

  it('should repeat ayah when toggled', function(done) {
    clock.tick(1000);
    ReactTestUtils.Simulate.click(node.querySelector('.audioplayer-repeat label'));
    ReactTestUtils.Simulate.click(node.querySelector('.ss-play'));

    clock.tick(1001);

    expect(foundComponent.changeAyah.args[0][0]).to.eql(1);
    expect(foundComponent.changeAyah.args[0][1]).to.eql(true);
    foundComponent.props.currentAudio.pause();
    done();
  });
});
