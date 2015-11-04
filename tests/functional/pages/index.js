module.exports = {
  url: 'http://localhost:8000',
  elements: {
    surahList: {
      selector: '.surah-list',
    },
    searchInput: {
      selector: '.searchinput'
    },
    indexHeader: {
      selector: '.index-header'
    },
    firstSurah: {
      selector: '.surah-list a[href="/1"]'
    },
    lastSurah: {
      selector: '.surah-list a[href="/114"]'
    }
  }
};
