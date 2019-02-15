import React from 'react';
import styled from 'styled-components';
import T, { KEYS } from './T';

const NoScriptWarning = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1201;
  text-align: center;
  color: #fff;
  background-color: #ae0000;
  padding: 5px 0 5px 0;
`;

const NoScript: React.SFC = () => (
  <noscript>
    <NoScriptWarning className="row">
      <div className="col-md-12">
        <p>
          <T id={KEYS.NO_SCRIPT_DESCRIPTION} />
          <a href="http://www.enable-javascript.com/">
            <T id={KEYS.CLICK_HERE} />
          </a>
        </p>
      </div>
    </NoScriptWarning>
  </noscript>
);

export default NoScript;
