/* eslint-disable */
import React, { Component, PropTypes } from 'react';
const style = require('./style.scss');

export default class CoreLoader extends Component {
  static propTypes = {
    children: PropTypes.object,
    minHeight: PropTypes.oneOf(['string', 'number'])
  }

  render() {
    const { children, minHeight } = this.props;

    return (
      <div className={style.container}>
        <div className={style.loader} style={minHeight ? {minHeight:  minHeight} : {}}/>
        {children}
      </div>
    );
  }
}
