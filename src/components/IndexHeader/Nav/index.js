import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { connect } from 'react-redux';

export class IndexHeaderNav extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  state = {
    open: false
  };

  openNav(event) {
    event.preventDefault();

    this.setState({open: !this.state.open});
  }

  links() {
    const { user } = this.props;
    const classNames = `links ${this.state.open ? 'open' : ''}`;

    return (
      <ul className={classNames}>
        <li>
          <Link to="/apps" data-metrics-event-name="IndexHeader:Link:Mobile">
            Mobile
          </Link>
        </li>
        <li>
          <a href="https://quran.zendesk.com/hc/en-us/articles/210090626-Development-help" target="_blank" data-metrics-event-name="IndexHeader:Link:Developer">
            Developers
          </a>
        </li>
        <li>
          <a href="http://legacy.quran.com" data-metrics-event-name="IndexHeader:Link:Legacy">Legacy Quran.com</a>
        </li>
        <li>
          <Link to="/donations" data-metrics-event-name="IndexHeader:Link:Contribute">
            Contribute
          </Link>
        </li>
        <li>
          <a href="https://quran.zendesk.com/hc/en-us" data-metrics-event-name="IndexHeader:Link:Contact">
            Contact us
          </a>
        </li>
        {
          user &&
            <li>
              <Link to="/profile" data-metrics-event-name="IndexHeader:Link:Profile">
                {user.firstName}
              </Link>
            </li>
        }
      </ul>
    );
  }

  render() {
    return (
      <div className="nav">
        {this.links()}
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.auth.user
  })
)(IndexHeaderNav);
