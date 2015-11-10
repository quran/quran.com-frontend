import {createMockComponentContext} from 'fluxible/utils';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import SearchInput from 'components/header/SearchInput';
import provideContext from 'fluxible-addons-react/provideContext';

var component, node, makeComponent, context;

describe('SearchInput', function() {
  beforeEach(function() {
    context = createMockComponentContext({});
    sinon.stub(context, 'executeAction');

    var SearchInputClass = provideContext(SearchInput);

    component = ReactTestUtils.renderIntoDocument(
      <SearchInputClass context={context}  />
    );

    node = ReactDOM.findDOMNode(component);
  });

  it('should render', function() {
    expect(node).to.exist;
  });

  it('should search on enter clicked', function() {
    ReactDOM.findDOMNode(component).querySelector('input').value = 'wife';
    ReactTestUtils.Simulate.keyUp(ReactDOM.findDOMNode(component).querySelector('input'), {keyCode: 13});

    expect(context.executeAction).to.have.been.called;
    expect(context.executeAction.args[0][1].url).to.equal('/search?q=wife');
  });

  it('should search on button clicked', function() {
    ReactDOM.findDOMNode(component).querySelector('input').value = 'wife';
    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component).querySelector('i'), {type: 'click'});

    expect(context.executeAction).to.have.been.called;
    expect(context.executeAction.args[0][1].url).to.equal('/search?q=wife');
  });

  it('should search arabic', function() {
    ReactDOM.findDOMNode(component).querySelector('input').value = 'إن الله';
    ReactTestUtils.Simulate.keyUp(ReactDOM.findDOMNode(component).querySelector('input'), {keyCode: 13});

    expect(context.executeAction).to.have.been.called;
    expect(context.executeAction.args[0][1].url).to.equal('/search?q=إن الله');
  });

  it('should redirect to surah and ayah', function() {
    ReactDOM.findDOMNode(component).querySelector('input').value = '2:50';
    ReactTestUtils.Simulate.keyUp(ReactDOM.findDOMNode(component).querySelector('input'), {keyCode: 13});

    expect(context.executeAction).to.have.been.called;
    expect(context.executeAction.args[0][1].url).to.equal('/2/50-60');
  });
});
