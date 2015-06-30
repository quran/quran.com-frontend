import React from 'react';
import {handleRoute, NavLink} from 'fluxible-router';
/**
 * Has to take in current page, hits per page, and total hits
 */

class Pagination extends React.Component {
  numberOfPages() {
    return Math.ceil(this.props.totalHits / this.props.hitsPerPage);
  }

  renderBack() {
    var link, className;
    if (this.props.currentRoute.get('query').get('p') &&
        parseInt(this.props.currentRoute.get('query').get('p')) !== 1) {
      link = `${this.props.currentRoute.get('path')}?q=${this.props.currentRoute.get('query').get('q')}&p=${this.props.currentRoute.get('query').get('p') - 1}`;
    }
    else {
      link = '#';
      className = 'disabled';
    }

    return (
      <li>
        <a href={link} className={className} aria-label="Previous">
          <span aria-hidden="true"><i className="ss-icon ss-directleft"/></span>
        </a>
      </li>
    );
  }

  renderForward() {
    var link;

    if (this.props.currentRoute.get('query').get('p')) {
      link = `${this.props.currentRoute.get('path')}?q=${this.props.currentRoute.get('query').get('q')}&p=${parseInt(this.props.currentRoute.get('query').get('p')) + 1}`;
    }
    else {
      link = `${this.props.currentRoute.get('path')}?q=${this.props.currentRoute.get('query').get('q')}&p=2`;
    }

    return (
      <li>
        <a href={link} aria-label="Next">
          <span aria-hidden="true"><i className="ss-icon ss-directright"/></span>
        </a>
      </li>
    );
  }

  renderPages() {
    var list = [], className;
    for (var i = 0; i < this.numberOfPages(); i++) {
      var link = `${this.props.currentRoute.get('path')}?q=${this.props.currentRoute.get('query').get('q')}&p=${i + 1}`;

      if (parseInt(this.props.currentRoute.get('query').get('p')) === (i + 1) ||
          (!this.props.currentRoute.get('query').get('p') && i === 0)) {
        className = 'active';
      }
      else {
        className = '';
      }

      list.push(
        <li key={i}><NavLink href={link} className={className}>{i + 1}</NavLink></li>
      );
    }

    return list;
  }

  render() {
    return (
      <nav>
        <ul className="pagination">
          {this.renderBack()}
          {this.renderPages()}
          {this.renderForward()}
        </ul>
      </nav>
    );
  }
}

Pagination = handleRoute(Pagination);

export default Pagination;
