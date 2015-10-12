import {createMockActionContext} from 'fluxible/utils';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Immutable from 'immutable';

import AyahsStore from 'stores/AyahsStore';
import { RouteStore } from 'fluxible-router';
import getAyahs from '../../fixtures/getAyahs';

import * as AudioplayerActions from 'actions/AudioplayerActions';
let actionContext, currentRoute;

describe('AudioplayerActions', function() {
  beforeEach(function() {
    currentRoute = Immutable.Map({
      path: 'http:localhost:8000',
      params: Immutable.Map({
        range: '1-10',
        surahId: 2
      })
    });

    actionContext = createMockActionContext({
      stores: [AyahsStore, RouteStore]
    });

    actionContext.getStore('AyahsStore').ayahs = getAyahs.slice(0, 10);

    actionContext.getStore('RouteStore').getCurrentRoute = function() {
      return currentRoute;
    }

    sinon.stub(actionContext, 'executeAction');
  });

  it('should dispatch to next ayah', function() {
    AudioplayerActions.changeAyah(actionContext, {ayah_num: 2, shouldPlay: false}, function() {
      return;
    });
    expect(actionContext.dispatchCalls.length).to.equal(1);
    expect(actionContext.dispatchCalls[0].name).to.equal('audioplayerAyahChange');
    expect(actionContext.dispatchCalls[0].payload).to.eql({ayah_num: 2, shouldPlay: false});
  });

  it('should dispatch to next ayah and call for additional ayahs', function() {
    AudioplayerActions.changeAyah(actionContext, {ayah_num: 7, shouldPlay: false}, function() {
      return;
    });

    expect(actionContext.dispatchCalls.length).to.equal(1);
    expect(actionContext.dispatchCalls[0].name).to.equal('audioplayerAyahChange');
    expect(actionContext.dispatchCalls[0].payload).to.eql({ayah_num: 7, shouldPlay: false});
    expect(actionContext.executeAction).to.have.been.called;
    expect(actionContext.executeAction.args[0][1].from).to.eql(11);
    expect(actionContext.executeAction.args[0][1].to).to.eql(20);
  });

  it('should dispatch to next ayah and call for additional ayahs when already called', function() {
    actionContext.getStore('AyahsStore').ayahs = getAyahs.slice(0, 20);

    AudioplayerActions.changeAyah(actionContext, {ayah_num: 17, shouldPlay: false}, function() {
      return;
    });

    expect(actionContext.dispatchCalls.length).to.equal(1);
    expect(actionContext.dispatchCalls[0].name).to.equal('audioplayerAyahChange');
    expect(actionContext.dispatchCalls[0].payload).to.eql({ayah_num: 17, shouldPlay: false});
    expect(actionContext.executeAction).to.have.been.called;
    expect(actionContext.executeAction.args[0][1].from).to.eql(21);
    expect(actionContext.executeAction.args[0][1].to).to.eql(30);
  });

});
