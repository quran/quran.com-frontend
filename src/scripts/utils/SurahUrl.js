export default function(id, name) {
  let surahName = name.toLowerCase().replace(/\W+/g, '-');

  return `/${surahName}/${id}`;
}
