import React, { Component, PropTypes } from 'react';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';

const style = require('./style.scss');

@connect(null, { pushState })
export default class SearchInput extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    className: PropTypes.string
  }

  search(event) {
    if (event.key === 'Enter' || event.keyCode === 13 || event.type === 'click') {
      const searchValue = React.findDOMNode(this).querySelector('input').value;
      const pattern = new RegExp(/\d[\.,\:,\,]\d/);
      let ayah;
      let surah;

      if (pattern.test(searchValue)) {
        surah = searchValue.split(/[\.,\:,\,]/)[0];
        ayah = parseInt(searchValue.split(/[\.,\:,\,]/)[1], 10);

        this.props.pushState(null, `/${surah}/${ayah}-${ayah + 10}`);
      } else {
        this.props.pushState(null, `/search`, {q: searchValue});
      }
    }

    // This checks to see if the user is typing Arabic
    // and adjusts the text-align.
    const arabic = new RegExp(/[\u0600-\u06FF]/);

    if (arabic.test(event.target.value)) {
      event.target.style.textAlign = 'right';
    } else {
      event.target.style.textAlign = 'left';
    }
  }

  render() {
    const { className } = this.props;

    return (
      <div className={`right-inner-addon ${className} ${style.searchInput}`}>
        <i className={`ss-icon ss-search ${style.icon}`} onClick={this.search.bind(this)} />
        <input type="text"
               placeholder="Search"
               onKeyUp={this.search.bind(this)} />
      </div>
    );
  }
}
