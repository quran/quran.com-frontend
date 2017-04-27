import React from 'react';
import IndexHeader from 'components/IndexHeader';

export default () => (
  <div className="top-section">
    <IndexHeader noSearch />
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h1>Quran.com</h1>
        </div>
        <div className="col-md-8 col-md-offset-2">
          <h3>Who we are.</h3>
          <p>
            Since 2008, Alhamdulilah Quran.com now serves over 3.1 million
            visits from all corners of the world - and we continue to grow everyday.
            <br /><br />
            This, with the blessing of Allah, is powered by merely 5 volunteers who are
            working hard on their spare time to keep this project as
            beneficial and useful to people all around the world.
          </p>
          <h3>How you can help.</h3>
          <p>
            Quran.com has an incredible amount of potential from a product standpoint
            and a team standpoint.
            We need to continue innovating the product and the experience to serve you
            better. To do so we
            have overhead costs which include:
          </p>
          <ul>
            <li>Server costs</li>
            <li>
              Data analytics and metrics tools to best learn about your
              needs (Optimizely, Heap, Keen, etc.)
            </li>
            <li>
              Design help (we are striving to follow our beautiful religion
              by making beautiful products)
            </li>
          </ul>
          <h3>Make a difference.</h3>
          <p>
            Making a difference for Quran.com is as simple as a Tweet,
            Facebook share or email us feedback.
            For those looking to make a stronger impact, support us by
            contributing any monetary amount.
          </p>
        </div>

        <div className="col-md-4 col-md-offset-4 text-center">
          <br /><br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://quran.tilt.com/support-quran-com-preorder/checkout/payment"
            className="btn btn-lg btn-block btn-primary"
          >
            Support Quran.com
          </a>
          <br /><br />
          If you have any questions, please do not hesitate to contact
          us at <a href="mailto:support@quran.zendesk.com">support@quran.zendesk.com.</a>
        </div>
      </div>
    </div>
  </div>
);
