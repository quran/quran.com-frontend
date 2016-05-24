import React from 'react';
import Link from 'react-router/lib/Link';
/**
 * Has to take in current page, hits per page, and total hits
 */

class Pagination extends React.Component {
  numberOfPages() {
    return Math.ceil(this.props.totalHits / this.props.hitsPerPage);
  }

  renderBack() {
    var getP = this.props.currentRoute.get('query').get('p');
    var getQ = this.props.currentRoute.get('query').get('q');
    var getPath = this.props.currentRoute.get('path');
    var link, className;
    if (getP &&
        parseInt(getP) !== 1) {
      link = `${getPath}?q=${getQ}&p=${getP - 1}`;
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
    var getP = this.props.currentRoute.get('query').get('p');
    var getQ = this.props.currentRoute.get('query').get('q');
    var getPath = this.props.currentRoute.get('path');
    var link;

    if (getP) {
      link = `${getPath}?q=${getQ}&p=${parseInt(getP) + 1}`;
    }
    else {
      link = `${getPath}?q=${getQ}&p=2`;
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
    var getP = this.props.currentRoute.get('query').get('p');
    var getQ = this.props.currentRoute.get('query').get('q');
    var getPath = this.props.currentRoute.get('path');
    var list = [], className;
    for (var i = 0; i < this.numberOfPages(); i++) {
      var link = `${getPath}?q=${getQ}&p=${i + 1}`;

      if (parseInt(getP) === (i + 1) ||
          (!getP && i === 0)) {
        className = 'active';
      }
      else {
        className = '';
      }

      list.push(
        <li key={i}><Link to={link} className={className}>{i + 1}</Link></li>
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

export default Pagination;
