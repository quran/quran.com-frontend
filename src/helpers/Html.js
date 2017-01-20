/* eslint-disable global-require, quotes, max-len */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

const Html = ({ store, component, assets }) => {
  const content = component ? ReactDOM.renderToString(component) : '';
  const head = Helmet.rewind();

  return (
    <html lang="en">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {head.style.toComponent()}

        {Object.keys(assets.styles).map((style, i) => (
          <link
            href={assets.styles[style]}
            key={i} media="screen, projection"
            rel="stylesheet"
            type="text/css"
          />
        ))}
        {
          Object.keys(assets.styles).length === 0 ?
            <style dangerouslySetInnerHTML={{ __html: (require('../../src/styles/bootstrap.config')) }} /> :
          null
        }
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-8496014-1', 'auto');
            `
          }}
          charSet="UTF-8"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) {navigator.serviceWorker.register('/quran-service-worker.js', {scope: './'}).then(function(registration) {}).catch(function(error) {});}`
          }}
          charSet="UTF-8"
        />
        <script
          dangerouslySetInnerHTML={{ __html: `window.reduxData=${serialize(store.getState())};` }}
          charSet="UTF-8"
        />
        {
          process.env.NODE_ENV === 'production' &&
            <script
              dangerouslySetInnerHTML={{ __html: `/*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(c){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var o=this.createElement("script");n&&(this.domain=n),o.id="js-iframe-async",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write('<body onload="document._l();">'),o.close()}("https://assets.zendesk.com/embeddable_framework/main.js","quran.zendesk.com");/*]]>*/` }}
            />
        }
        {
          process.env.NODE_ENV === 'production' &&
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);mixpanel.init("d3f9b2f15c4bf0509e85845b56921034");
                `
              }}
            />
        }
        {
          process.env.NODE_ENV === 'production' &&
            <script src="https://cdn.ravenjs.com/3.0.4/raven.min.js" />
        }
        {Object.keys(assets.javascript).map((script, i) =>
          <script src={assets.javascript[script]} key={i} />
        )}
        {
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" />
        }
      </body>
    </html>
  );
};

Html.propTypes = {
  store: PropTypes.object, // eslint-disable-line
  assets: PropTypes.object, // eslint-disable-line
  component: PropTypes.element
};

export default Html;
