import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import { createStore } from 'redux';

import ApiClient from '../../helpers/ApiClient';

let mockStore;
let component;
let dom;
let store;
let dispatch;

// import Home from './index';

describe('Home', () => {
  beforeEach(() => {
    mockStore = {
      surahs: {
        errored: false,
        loaded: false,
        current: null,
        entities: {
          "1":{"bismillahPre":false,"page":[1,1],"ayat":7,"name":{"arabic":"الفاتحة","simple":"Al-Fatihah","complex":"Al-Fātiĥah","english":"The Opener"},"revelation":{"order":5,"place":"makkah"},"id":1},
          "2":{"bismillahPre":true,"page":[2,49],"ayat":286,"name":{"arabic":"البقرة","simple":"Al-Baqarah","complex":"Al-Baqarah","english":"The Cow"},"revelation":{"order":87,"place":"madinah"},"id":2}
        }
      },
      routing: {
        params: {},
        location: {
          pathname:"/",
          search:"",
          hash:"",
          state:null,
          action:"POP",
          query: {},
          key:"31zavf"
        }
      }
    };

    store = createStore(browserHistory, new ApiClient(), mockStore);
    // component = renderIntoDocument(
    //   <Provider store={store} key="provider">
    //     <Home />
    //   </Provider>
    // );
    //
    // dom = ReactDOM.findDOMNode(component);
  });

  afterEach(() => {
    mockStore = null;
    component = null;
    dom = null;
    store = null;
    dispatch = null;
  });

  xit('should return true', () => {
    expect(true).to.be.truthy;
  });
});
