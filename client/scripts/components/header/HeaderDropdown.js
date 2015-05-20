import React from 'react';
import $ from 'jquery';
import {DropdownMenu} from 'react-bootstrap';

class HeaderDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleDropdownClick(e) {
    e.preventDefault();

    this.setState({
      open: !this.state.open
    });

    // When the dropdown is open, monitor clicks to close
    $(document).on('click.dropdownOpen', (e) => {
      if ($(React.findDOMNode(this)).has(e.target).length === 0) {
        this.setState({
            open: false
        });
        $(document).off('click.dropdownOpen');
      }
    });
  }

  render() {

    var classes = React.addons.classSet({
      'open': this.state.open,
      'col-md-2': true,
      'col-xs-10': true,
      'dropdown': true,
      'dropdownChange': true,
      'full-height': true,
      'text-left': true
    }) + ' ' + this.props.className;

    return (
      <div className={classes} dropdown>
        <a href className="dropdown-toggle" onClick={this.handleDropdownClick.bind(this)}>
          {this.props.linkContent} <i className="fa fa-caret-down fa-2x pull-right"/>
        </a>
        <DropdownMenu
                ref="menu"
                aria-labelledby={this.props.id}
                pullRight={this.props.pullRight}
                key={1}>
                {this.props.children}
              </DropdownMenu>
      </div>
    );
  }
}

export default HeaderDropdown;
