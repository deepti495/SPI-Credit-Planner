# Site Name
This repo uses [metalsmith](http://www.metalsmith.io/) and DatoCMS to build a static HTML site.

## Requirements

* Node.js (version 7.0+)
* NPM

## Installation

1. Download or clone this repository, and open it in your terminal
2. Run `npm install`

## Build Process

When you are ready to compile the site or make changes, enter `npm start` in the terminal.

This kicks off the build process, which plops the compiled site in the directory `/docs`. After the site it built, a local server is started, and the rendered site is opened in a browser. While the server is running, changes made to the source files are recompiled and reloaded automatically everywhere the site is loaded.

## Committing

Please compile source changes into a finished site before committing to the repo.

## What does it do?

Metalsmith is a very lightweight CMS, and can let us expand the site in the future easily. More importantly, in the short term it gets us some nice things:

* SASS
* Markdown
* CSS prefixing
* HTML partials
* HTML templates
* Uglification/Minification
* Inlining resources
* Serves changes live

It can also do (but currently isn't doing) things like...

* Fingerprint assets (for more predictable caching)
* Create collections
* Pagination
* Sitemaps
* Run tests, linter

## Getting the latest content

The site content is managed in [DatoCMS](https://datocms.com) and the latest is automatically incorporated into the production build. To update your local content, run `./node_modules/.bin/dato dump` which will create markdown files for the homepage, landing pages, and a global configuration file.

## Deploying

Everything checked into the branch `master` kicks off a [build script](.circleci/config.yml) in [CirlceCI](https://circleci.com/) that gets the latest content, generates the site, and sends the finished pages to s3 (with content fronted by CloudFront).
