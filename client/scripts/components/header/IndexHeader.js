'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'IndexHeader',

  render() {
    return (
      <div className="index-header">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1 text-center">
              <img src="images/logo-lg-w.png" className="logo" />
              <h4 className="title">THE NOBLE QUR'AN</h4>
              <div className="right-inner-addon">
                <i className="fa fa-search fa-flip-horizontal"></i>
                <input name="search" placeholder="Search" type="search"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
