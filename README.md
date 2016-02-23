# pep8.org

PEP 8, for Humans.

## Developing

If you serve this locally from `0.0.0.0`, the fonts will display properly. They are blocked on all domains except `0.0.0.0` and `pep8.org`.

An easy way to do this:

    $ python -m SimpleHTTPServer

## Deploying

    $ heroku buildpacks:set https://github.com/hone/heroku-buildpack-static.git
