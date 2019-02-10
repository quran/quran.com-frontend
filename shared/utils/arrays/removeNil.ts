import isNil from 'lodash/isNil';

export default function removeNil(array) {
  return array.filter(item => !isNil(item));
}
