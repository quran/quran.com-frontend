/* eslint-disable global-require */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

const Html = ({ store, component, assets }) => {
  const content = component ? ReactDOM.renderToString(component) : '';
  const head = Helmet.rewind();

  return (
    <html>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        {head.style.toComponent()}

        <script dangerouslySetInnerHTML={{__html: `/*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(c){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var o=this.createElement("script");n&&(this.domain=n),o.id="js-iframe-async",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write('<body onload="document._l();">'),o.close()}("https://assets.zendesk.com/embeddable_framework/main.js","quran.zendesk.com");
        /*]]>*/`}} />

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
            <style dangerouslySetInnerHTML={{__html: (require('../../bootstrap.config'))}} /> :
          null
        }
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html: content}} />
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
          dangerouslySetInnerHTML={{__html: `window.reduxData=${serialize(store.getState())};`}}
          charSet="UTF-8"
        />
        <script src="https://cdn.ravenjs.com/3.0.4/raven.min.js" />
        {Object.keys(assets.javascript).map((script, i) =>
          <script src={assets.javascript[script]} key={i} />
        )}
      </body>
    </html>
  );
};

Html.propTypes = {
  store: PropTypes.object,
  assets: PropTypes.object,
  component: PropTypes.any
};

export default Html;
