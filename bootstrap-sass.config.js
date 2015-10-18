var ExtractTextPlugin = require("extract-text-webpack-plugin");
// Example file. Copy this to your project
module.exports = {
  verbose: false, // Set to true to show diagnostic information
  debug: false,

  // IMPORTANT: Set next two configuration so you can customize
  // bootstrapCustomizations: gets loaded before bootstrap so you can configure the variables used by bootstrap
  // mainSass: gets loaded after bootstrap, so you can override a bootstrap style.
  // NOTE, these are optional.

   preBootstrapCustomizations: "src/styles/_bootstrap-config.scss",
   mainSass: "src/styles/_main.scss",

  // Default for the style loading
  // styleLoader: "style-loader!css-loader!sass-loader",
  //
  // If you want to use the ExtractTextPlugin
  //   and you want compressed
      // styleLoader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
  //
  // If you want expanded CSS
  styleLoader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer!sass?outputStyle=expanded"),

  scripts: {
    'transition': false,
    'alert': false,
    'button': false,
    'carousel': false,
    'collapse': false,
    'dropdown': true,
    'modal': true,
    'tooltip': true,
    'popover': true,
    'scrollspy': false,
    'tab': false,
    'affix': false
  },
  styles: {
    "mixins": true,

    "normalize": true,
    "print": false,

    "scaffolding": true,
    "type": true,
    "code": true,
    "grid": true,
    "tables": true,
    "forms": true,
    "buttons": true,

    "component-animations": true,
    "glyphicons": false,
    "dropdowns": true,
    "button-groups": false,
    "input-groups": false,
    "navs": true,
    "navbar": true,
    "breadcrumbs": false,
    "pagination": true,
    "pager": true,
    "labels": true,
    "badges": true,
    "jumbotron": false,
    "thumbnails": false,
    "alerts": false,
    "progress-bars": false,
    "media": false,
    "list-group": false,
    "panels": true,
    "wells": false,
    "close": true,

    "modals": true,
    "tooltip": true,
    "popovers": true,
    "carousel": false,

    "utilities": true,
    "responsive-utilities": true
  }
};
