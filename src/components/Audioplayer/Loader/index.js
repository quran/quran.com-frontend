import React from 'react';

export default () => (
  <div className="sequence">
    <div className="seq-preloader">
      <svg height="16" width="42" className="seq-preload-indicator" xmlns="http://www.w3.org/2000/svg">
        <circle className="seq-preload-circle seq-preload-circle-1" cx="6" cy="8" r="5" />
        <circle className="seq-preload-circle seq-preload-circle-2" cx="20" cy="8" r="5" />
        <circle className="seq-preload-circle seq-preload-circle-3" cx="34" cy="8" r="5" />
      </svg>
    </div>
  </div>
);
