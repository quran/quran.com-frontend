
---
Symbolset
www.symbolset.com
Copyright © 2013 Oak Studios LLC
---


SS Standard v1.005


--------------------
Desktop
--------------------

Your download contains the set you purchased as OTF, TTF, EOT, WOFF, and SVG font files. OTF, or OpenType Format, is a cross-platform font file for use on the desktop. Don't be misled by the name, each of these file types contain OpenType features. The remaining four files are formatted for web browsers.

Install the OTF font and use it in any desktop application that supports OpenType features.

Your symbol set contains both symbols and alphabetic characters. Begin by typing a keyword from the documentation. Once the keyword is completed, and the font recognizes the keyword, the correlating symbol will be displayed in place of the letters.


--------------------
Web
--------------------

Start by first uploading the "webfonts" folder to your webserver. Then place this link tag within the <head> tags of your HTML:

    <link href="webfonts/ss-standard.css" rel="stylesheet" />

There are two common methods to use and reference symbols.

The first is use a symbol alongside a complementary word. Using class names, with CSS :before pseudo elements and Unicode code points, we can append symbols to words. In this example we're adding a check symbol to a submit button:

    <button class="ss-check">Submit</button>

The second way is to use a symbol in place of a word. This method triggers symbols with semantic keywords. When using this method on the web apply the generic "ss-icon" class to the element wrapping the keyword.

For example, when showing that a settings field is locked:

    Settings <i class="ss-icon">locked</i>

A lock symbol will be displayed alongside the word "Settings".

When using the replacement technique, sighted users will see symbols and search engines and screen readers will see the semantic keyword.

You can also use symbols with their direct Unicode value. See documentation.html for a full list of supported icons. This example will show a star icon:

    <i class="ss-icon">&#x22C6;</i> Favorites


--------------------
Browser support
--------------------

Keywords (with optional Javascript support):
Firefox 3.5+, Chrome 1+, Safari 2+, IE 7+, Opera 10.5+, iOS 3.2+, Android 1+

Keywords (without Javascript):
Firefox 3.5+, Chrome 11+, Safari 5+, IE 10+, iOS 4.2+, Android 3+

Unicode: All browsers that support TTF, EOT, WOFF, or SVG webfonts.

To add optional keyword support to legacy browsers through Javascript, insert this code at the end of your document before the </body> tag:

    <script src="webfonts/ss-standard.js"></script>

For more on browser support, see: http://symbolset.com/blog/browser-support/

Note: Keywords with spaces are not currently supported in Firefox.


--------------------
Versions
--------------------

Periodically Symbolset will push updates to sets. We'll add keywords, build out symbols, and squash bugs. Be sure to check your account (http://symbolset.com/account) for updates.

