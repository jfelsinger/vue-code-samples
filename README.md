# Overview

Included are the VUE related components (scripts and templates) for some
separate projects I've been working on. Each is in a different state of in
progress, and not quite to production standards yet.



## subtasker-app

This is probably the most interesting, though the version of vue used is
slightly older than the current. It contains the front-end implementation of
Stripe support for a Node.js app that I've been working on. Most of the heavy
lifting is left to the server, which is communicated with through a separate
module for this project that isn't included (ie. the `subtasker-client` include
in `scripts/lib/rest-client.js`).

## dndb-app

Of the two samples, this is the only one that is live. It's a very basic library
that I threw together one weekend for some of my friends who are into DnD (yes,
that DnD, very nerdy). Very simple, pagination and search. Not a production app
in any way, and currently very quirky because of some corners cut in the initial
implementation.

If you'd like to see the live site: http://dndb.joelfredrick.com/
