import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import ContentDropdown, { slugs } from './index';

let wrapper;
let onOptionChange = sinon.stub();
let defaultOption = 19

describe('<ContentDropdown />', () => {
  beforeEach(() => {
    onOptionChange = sinon.stub();
    wrapper = shallow(<ContentDropdown options={{content: [defaultOption]}} onOptionChange={onOptionChange} />);
  });

  it('should render', () => {
    expect(wrapper).toBeDefined();
  });

  it('should contain all the content options', () => {
    slugs.filter(slug => slug.language !== 'ar').forEach(slug => {
      expect(wrapper.text()).toContain(slug.name);
    });
  });

  it('should show chosen content option', () => {
    expect(wrapper.find(`#${defaultOption}en`).prop('checked')).toBe(defaultOption);
  });

  fit('should add option when clicked', () => {
    const id = 18;
    wrapper.find(`#${id}en`).simulate('change');

    expect(onOptionChange).toHaveBeenCalled();
    //expect(onOptionChange).toHaveBeenCalledWith({content: [defaultOption, id]});
  });

  xit('should remove option when clicked', () => {
    wrapper.find(`#${defaultOption}en`).simulate('change');

    expect(onOptionChange).to.have.been.called;
    expect(onOptionChange).to.have.been.calledWith({content: []});
  });

  xit('should remove all content', () => {
    const removeAll = wrapper.find({eventKey: 1})
    expect(removeAll.html()).to.contain('Remove all');

    removeAll.simulate('click');

    expect(onOptionChange).to.have.been.called;
    expect(onOptionChange).to.have.been.calledWith({content: []});
  });
});
