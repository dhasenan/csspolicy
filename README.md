# CSS Policy

CSS Policy is a Firefox extension that eliminates site styles except on sites you explicitly whitelist.


## Motivation

Ever go to a website and it's got <span style="color: #888; font-weight: 300">unreadably light
text</span>? It's a plague. And while we can't cut it out at the root, we can at least save
ourselves.

And CSS Policy is how.


## Installing

Currently, to install, you need to use the web-ext tool (`npm install web-ext`) to package the
extension, then load it into firefox yourself.

I'm working on getting it added to addons.mozilla.org.


## Usage

Hit the icon and it'll pop up a window.

Enter whitelisted sites, one per line. Then click Update.


