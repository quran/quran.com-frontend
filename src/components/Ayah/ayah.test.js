import { shallow } from 'enzyme';
import Ayah from './index.js';
import ayah from '../../../tests/fixtures/ayah';

let wrapper;

describe("Ayah", () => {

  beforeEach(() => {
    wrapper = shallow(<Ayah ayah={ayah} />);
  });

  it('should render', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have correct ayah number', () => {
    expect(wrapper.find('.label').text()).toBe(ayah.ayahKey);
  });

  it('should contain translations', () => {
    expect(wrapper.find('.translation').text()).toBe(ayah.content[0].resource.name);
  });



});
