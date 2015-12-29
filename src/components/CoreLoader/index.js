/* eslint-disable */
import React, { Component, PropTypes } from 'react';
const style = require('./style.scss');

export default class CoreLoader extends Component {
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    const { children } = this.props;



    return (
      <div className={style.container}>
        <div className={style.loader} />
        {children}
      </div>
    );
  }
}
