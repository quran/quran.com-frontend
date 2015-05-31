import React from 'react';
import classNames from 'classnames';

class HeaderDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var classes = classNames({
      'col-md-2': true,
      'col-xs-10': true,
      'dropdown': true,
      'full-height': true,
      'text-left': true,
      'border-right': true
    }) + ' ' + this.props.className;

    return (

      <div className={classes}>
        <a id={this.props.id}
           data-target="#"
           href="#"
           data-toggle="dropdown"
           aria-haspopup="true"
           aria-expanded="false"
           className="dropdown-toggle">
          <i className={this.props.linkIcon}/> {this.props.linkContent}
          <i className="ss-icon dropdown-icon pull-right"/>
        </a>

        <ul className="dropdown-menu" role="menu" aria-labelledby={this.props.id} pullRight={this.props.pullRight}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

export default HeaderDropdown;
