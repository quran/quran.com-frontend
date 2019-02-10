/* eslint-disable */
/**
 * This is used by the HtmlWebpackPlugin to generate an html page that we will
 * use as a fallback for our service worker when the user is offline.  It will
 * embed all the required asset paths needed to bootstrap the application
 * in an offline session.
 */

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import HTML from '../../../shared/components/HTML';

module.exports = function generate(context: $TsFixMe) {
  // const config = context.htmlWebpackPlugin.options.custom.config;
  // @ts-ignore
  const { ClientConfig } = context.htmlWebpackPlugin.options.custom;
  const html = renderToStaticMarkup(
    // @ts-ignore
    <HTML
      bodyElements={<ClientConfig nonce="OFFLINE_PAGE_NONCE_PLACEHOLDER" />}
    />
  );

  return `<!DOCTYPE html>${html}`;
};
