# pep8.org

PEP 8, for Humans.

---------------

**If you're interested in financially supporting Kenneth Reitz open source, consider [visiting this link](https://cash.me/$KennethReitz). Your support helps tremendously with sustainability of motivation, as Open Source is no longer part of my day job.**

## Developing

If you serve this locally from `0.0.0.0`, the fonts will display properly. They are blocked on all domains except `0.0.0.0` and `pep8.org`.

An easy way to do this:

    $ python -m SimpleHTTPServer #python2
or

    $ python -m http.server      #python3

## Syncing PEP 8 changes

[pep8.org](http://pep8.org/) mirrors the original PEP 8 document at [www.python.org/dev/peps/pep-0008/](https://www.python.org/dev/peps/pep-0008/).

Whenever the original PEP 8 at python.org gets updated we need to migrate these changes to pep8.org. This process is difficult to automate because manual style and formatting tweaks were made to the original source material to create `index.html`.

To migrate the latest changes from the original PEP 8 source do the following:

* Look at the [source control history for the original PEP 8](https://github.com/python/peps/commits/master/pep-0008.txt) and compare it with what's live on pep8.org. (As of 2017-09 we're tracking rev `b61bb7d`.)

* Apply the missing changes to `index.html` and create a pull-request to get them reviewed and live on pep8.org

## Deployment

Automatically deployed on Netlify on each push to master.
