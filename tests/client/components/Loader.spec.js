import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Loader from 'components/Loader';

var component;

describe('Loader', function() {
  beforeEach(function() {
    component = ReactTestUtils.renderIntoDocument(
      <Loader />
    );
  });

  it('should render', function() {
    var node = React.findDOMNode(component);

    expect(node).to.exist;
    expect(node.querySelector('img')).to.exist
  });
});
