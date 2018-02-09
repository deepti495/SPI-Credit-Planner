const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const metal = require('metalsmith');
const define = require('metalsmith-define');
const collections = require('metalsmith-collections');
const sass = require('metalsmith-sass');
const postcss = require('metalsmith-postcss');
const layouts = require('metalsmith-layouts');
const inplace = require('metalsmith-in-place');
const msMarkdown = require('metalsmith-markdown');
const metadata = require('metalsmith-metadata');
const marked = require('marked');
const permalinks = require('metalsmith-permalinks');
const msIf = require('metalsmith-if');
const htmlMinifier = require("metalsmith-html-minifier");
const browserSync = require('metalsmith-browser-sync');
const handlebars = require('handlebars');
const helpers = require('./helpers');
const uglifyjs = require("metalsmith-uglifyjs");
const remove = require('metalsmith-move-remove');
const filedata = require('metalsmith-filedata');
const dotenv = require('dotenv').config();

const markdownSettings = {
  smartypants: true,
  gfm: true,
  tables: true
};

marked.setOptions(markdownSettings);

handlebars.registerHelper(helpers);

var site = metalsmith(__dirname)
  .source('./src')
  .destination('./docs')
  .clean(true)
  .use(uglifyjs({
    src: ["**/*.js", "!**/**/*.min.js"],
    target: function(inFile) { return inFile + ".mini.js"; },
    deleteSources: true,
    uglifyOptions: {
      mangle: true,
      compress: {
        unused: false,
        warnings: true
      }
    }
  }))
  .use(sass({
    'outputStyle': 'compressed',
    'sourceComments': false,
    'outputDir': 'css/'
  }))
  .use(postcss({
    plugins: {
      'autoprefixer': {}
    }
  }))
  .use(filedata({
    pattern: ['css/*.css', 'js/*.js', 'images/*.svg'],
    key: 'contentData'
  }))
  .use(inplace({
    'engine': 'handlebars',
    'pattern': [
      '**/*.md',
      '**/*.css'
    ],
    'partials': './partials'
  }))
  .use(msMarkdown(markdownSettings))
  .use(permalinks({
    'relative': false
  }))
  .use(layouts({
    'engine': 'handlebars',
    'default': 'default.html',
    'pattern': [
      '**/*.md',
      '**/*.html'
    ],
    'directory': './layouts'
  }))
  .use(remove({
    remove: ['data']
  }))
  if (process.env.NODE_ENV == 'dev') {
    site = site
    .use(browserSync({
      port: 8001,
      server: {
        baseDir: 'docs'
      },
      files: [
        'src/**/**/*',
        'layouts/**/*',
        'partials/**/*'
      ]
    }))
  }
  site.build(function (err) {
    if (err) {
      throw err;
    }
    else {
      console.log('built!');
    }
  });
