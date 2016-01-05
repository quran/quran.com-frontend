export default function asArray(models) {
  return Object.keys(models).map(id => models[id]);
}
