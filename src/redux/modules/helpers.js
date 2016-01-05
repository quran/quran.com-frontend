export function asArray(object) {
  return Object.keys(object).map(id => object[id]);
}
