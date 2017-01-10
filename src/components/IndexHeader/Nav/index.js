import React, { Component } from 'react';
import Link from 'react-router/lib/Link';
import { connect } from 'react-redux';

import { userType } from 'types';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

export class IndexHeaderNav extends Component {
  static propTypes = {
    user: userType
  };

  state = {
    open: false
  };

  openNav(event) {
    event.preventDefault();

    this.setState({ open: !this.state.open });
  }

  links() {
    const { user } = this.props;
    const classNames = `links ${this.state.open ? 'open' : ''}`;

    return (
      <ul className={classNames}>
        <li>
          <Link to="/apps" data-metrics-event-name="IndexHeader:Link:Mobile">
            <LocaleFormattedMessage
              id="nav.mobile"
              defaultMessage="Mobile"
            />
          </Link>
        </li>
        <li>
          <a
            href="https://quran.zendesk.com/hc/en-us/articles/210090626-Development-help"
            target="_blank"
            rel="noopener noreferrer"
            data-metrics-event-name="IndexHeader:Link:Developer"
          >
            <LocaleFormattedMessage
              id="nav.developers"
              defaultMessage="Developers"
            />
          </a>
        </li>
        <li>
          <a href="http://legacy.quran.com" data-metrics-event-name="IndexHeader:Link:Legacy">
            <LocaleFormattedMessage
              id="nav.legacySite"
              defaultMessage="Legacy Quran.com"
            />
          </a>
        </li>
        <li>
          <Link to="/donations" data-metrics-event-name="IndexHeader:Link:Contribute">
            <LocaleFormattedMessage
              id="nav.contribute"
              defaultMessage="Contribute"
            />
          </Link>
        </li>
        <li>
          <a href="https://quran.zendesk.com/hc/en-us" data-metrics-event-name="IndexHeader:Link:Contact">
            <LocaleFormattedMessage
              id="nav.contactUs"
              defaultMessage="Contact Us"
            />
          </a>
        </li>
        {
          user &&
            <li>
              <Link to="/profile" data-metrics-event-name="IndexHeader:Link:Profile">
                {user.firstName || user.name}
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
