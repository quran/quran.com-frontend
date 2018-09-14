/**
 * This module is responsible for generating the HTML page response for
 * the react application middleware.
 */

/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

import config from '../../../../config';
import ifElse from '../../../../shared/utils/logic/ifElse';
import removeNil from '../../../../shared/utils/arrays/removeNil';
import getClientBundleEntryAssets from './getClientBundleEntryAssets';

import ClientConfig from '../../../../config/components/ClientConfig';
import HTML from '../../../../shared/components/HTML';
import highlightStyles from '../../../helpers/highlightStyles';
import fontsStyle from '../../../helpers/fontsStyle';

// PRIVATES

function KeyedComponent({ children }: $TsFixMe) {
  return Children.only(children);
}

// Resolve the assets (js['index.css']) for the client bundle's entry chunk.
const clientEntryAssets = getClientBundleEntryAssets();

function stylesheetTag(stylesheetFilePath: $TsFixMe) {
  return (
    <link
      href={stylesheetFilePath}
      media="screen, projection"
      rel="stylesheet"
      type="text/css"
    />
  );
}

function scriptTag(jsFilePath: string, props = {} as $TsFixMe) {
  return <script type="text/javascript" src={jsFilePath} {...props} />;
}

function inlineStyle(body: $TsFixMe) {
  return <style dangerouslySetInnerHTML={{ __html: body }} />;
}

const ServerHTML: React.SFC<$TsFixMe> = (props: $TsFixMe) => {
  const {
    asyncComponentsState,
    helmet,
    nonce,
    reactAppString,
    reduxData,
    styleTags,
  } = props;

  const isProd = process.env.NODE_ENV === 'production';

  // Creates an inline script definition that is protected by the nonce.
  const inlineScript = (body: $TsFixMe) => (
    <script
      nonce={nonce}
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );

  const thirdPartyTags = [
    ifElse(isProd)(() =>
      inlineScript(`(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
    h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
    (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
    })(window,document.documentElement,'async-hide','dataLayer',4000,
    {'GTM-PNMFTW3':true});`)
    ),

    ifElse(isProd)(() =>
      inlineScript(`(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', '${config('google.analytics.id')}', 'auto');
      ga('require', '${config('google.optimize.id')}');
      `)
    ),

    ifElse(isProd)(() =>
      inlineScript(`
        (function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);mixpanel.init("d3f9b2f15c4bf0509e85845b56921034");
      `)
    ),

    ifElse(isProd)(() => scriptTag(config('sentry.url'))),
    ifElse(isProd)(() =>
      scriptTag(config('zendesk.url'), { id: config('zendesk.id') })
    ),
  ];

  const headerElements = removeNil([
    ...ifElse(helmet)(() => helmet.meta.toComponent(), []),
    ...ifElse(helmet)(() => helmet.title.toComponent(), []),
    ...ifElse(helmet)(() => helmet.base.toComponent(), []),
    ...ifElse(helmet)(() => helmet.link.toComponent(), []),
    ifElse(clientEntryAssets && clientEntryAssets.index.css)(() =>
      stylesheetTag(clientEntryAssets.index.css)
    ),
    ...ifElse(helmet)(() => helmet.style.toComponent(), []),
    ...styleTags,
  ]);

  const bodyElements = removeNil([
    ...thirdPartyTags,
    inlineScript(`window.__REDUX_DATA__=${serialize(reduxData)};`),
    inlineScript(`window.__ASSETS__=${serialize(clientEntryAssets)};`),
    // Binds the client configuration object to the window object so
    // that we can safely expose some configuration values to the
    // client bundle that gets executed in the browser.
    <ClientConfig key="nonce" nonce={nonce} />,
    // Bind our async components state so the client knows which ones
    // to initialise so that the checksum matches the server response.
    // @see https://github.com/ctrlplusb/react-async-component
    ifElse(asyncComponentsState)(() =>
      inlineScript(
        `window.__ASYNC_COMPONENTS_REHYDRATE_STATE__=${serialize(
          asyncComponentsState
        )};`
      )
    ),
    // Enable the polyfill io script?
    // This can't be configured within a react-helmet component as we
    // may need the polyfill's before our client JS gets parsed.
    ifElse(config('polyfillIO.enabled'))(() =>
      scriptTag(
        `${config('polyfillIO.url')}?features=${config(
          'polyfillIO.features'
        ).join(',')}`
      )
    ),

    inlineStyle(fontsStyle),
    inlineStyle(highlightStyles),

    // When we are in development mode our development server will
    // generate a vendor DLL in order to dramatically reduce our
    // compilation times.  Therefore we need to inject the path to the
    // vendor dll bundle below.
    ifElse(
      process.env.BUILD_FLAG_IS_DEV === 'true' &&
        config('bundles.client.devVendorDLL.enabled')
    )(() =>
      scriptTag(
        `${config('bundles.client.webPath')}${config(
          'bundles.client.devVendorDLL.name'
        )}.js?t=${Date.now()}`
      )
    ),
    ifElse(clientEntryAssets && clientEntryAssets.index.js)(() =>
      scriptTag(clientEntryAssets.index.js)
    ),
    ...ifElse(helmet)(() => helmet.script.toComponent(), []),
  ]);

  return (
    <HTML
      htmlAttributes={ifElse(helmet)(
        () => helmet.htmlAttributes.toComponent(),
        null
      )}
      headerElements={headerElements.map((x, idx) => (
        <KeyedComponent key={idx}>{x}</KeyedComponent>
      ))}
      bodyElements={bodyElements.map((x, idx) => (
        <KeyedComponent key={idx}>{x}</KeyedComponent>
      ))}
      appBodyString={reactAppString}
    />
  );
};

ServerHTML.propTypes = {
  // eslint-disable-next-line
  asyncComponentsState: PropTypes.object,
  // eslint-disable-next-line
  reduxData: PropTypes.object,
  // eslint-disable-next-line
  helmet: PropTypes.object,
  // eslint-disable-next-line
  nonce: PropTypes.string,
  // eslint-disable-next-line
  reactAppString: PropTypes.string,
  // eslint-disable-next-line
  styleTags: PropTypes.arrayOf(PropTypes.element),
};

// EXPORT

export default ServerHTML;
