/* global document */
import React, { PropTypes, Component } from 'react';

const styles = require('./style.scss');

class Sidebar extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onSetOpen: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    open: false
  };

  componentWillReceiveProps(nextProps) {
    if (__CLIENT__ && nextProps.open) {
      document.body.removeEventListener('click', this.onBodyClick.bind(this), true);
      document.body.addEventListener('click', this.onBodyClick.bind(this), true);
    }

    return false;
  }

  onBodyClick = (event) => {
    const { onSetOpen } = this.props;

    if (!this.container.contains(event.target)) {
      return onSetOpen();
    }

    return false;
  }

  render() {
    const { open, children } = this.props;

    return (
      <div
        ref={(container) => { this.container = container; }}
        className={`${styles.container} sidebar ${open && styles.open}`}
      >
        {children}
      </div>
    );
  }
}

export default Sidebar;
