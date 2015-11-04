import {createMockComponentContext} from 'fluxible/utils';

import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Pagination from 'components/Pagination';
import Immutable from 'immutable';
import { RouteStore } from 'fluxible-router';
import provideContext from 'fluxible-addons-react/provideContext';

var component, node, makeComponent;

describe('Pagination', function() {
  beforeEach(function() {
    makeComponent = function(page) {
      var currentRoute = Immutable.Map({
        path: 'http:localhost:8000',
        query: Immutable.Map({q: 'light', p: page || 1})
      });

      var context = createMockComponentContext({
        stores: [RouteStore]
      });

      context.dispatcherContext.dispatcher.stores.RouteStore.prototype.getCurrentRoute = function() {
        return currentRoute;
      }

      var PaginationClass = provideContext(Pagination);

      component = ReactTestUtils.renderIntoDocument(
        <PaginationClass totalHits={100} hitsPerPage={20} context={context}/>
      );

      node = React.findDOMNode(component);
    }
  });

  it('should render', function() {
    makeComponent();

    expect(node).to.exist;
    expect(node.querySelectorAll('.pagination li').length).to.equal(7);
  });

  it('should disable first link when on first page', function() {
    makeComponent();
    expect(node.querySelector('.pagination li a').className).to.contain('disabled')

    makeComponent(4);
    expect(node.querySelector('.pagination li a').className).not.to.contain('disabled')
  });

  it('should point to next page', function() {
    makeComponent();
    expect(node.querySelectorAll('.pagination li a')[6].href).to.contain('p=2')

    makeComponent(4);
    expect(node.querySelectorAll('.pagination li a')[6].href).to.contain('p=5')
  });
});
