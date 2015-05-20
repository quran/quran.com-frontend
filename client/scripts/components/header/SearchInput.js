'use strict';

import React from 'react';

class SearchInput extends React.Component {
  search(e) {
    // e.target.value;
    console.log(e);
    // var ayah, pattern, surah;
    // pattern = new RegExp(/\d[\.,\:,\,]\d/);
    // if (pattern.test(searching)) {
    //   surah = searching.split(/[\.,\:,\,]/)[0];
    //   ayah = parseInt(searching.split(/[\.,\:,\,]/)[1]);
    //   $location.path('/' + surah + '/' + ayah + '-' + (ayah + 10));
    // } else {
    //   $location.path('/search').search({
    //     q: searching
    //   });
    // }
  }

  render() {
    var className = React.addons.classSet({
      'search-input': true
    }) + ' ' + this.props.className;

    return (
      <input type="text"
             placeholder="Search"
             className={className}
             onKeyUp={this.search} />
    );
  }
}

SearchInput.displayName = 'SearchInput';

export default SearchInput;
