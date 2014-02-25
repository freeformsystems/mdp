var marked = require('marked');
var utils = require('cli-util');
var repeat = utils.repeat;

var generator = require('../util/generator');
var footer = require('../util/footer');
var middleware = require('../middleware');
var stringify = require('../md/stringify');
var pandoc = require('../util/pandoc');
var manual = require('../util/manual');

var marked = require('marked');
var markzero = require('../md');

/**
 *  @func exec(tokens, [modifiers])
 *
 *  @api private
 *
 *  Executes the modify functions to alter
 *  the token list.
 *
 *  @param tokens The lexer tokens.
 *  @param modifiers An array of modifier functions.
 */
function run(tokens, meta, list, callback) {
  var i = 0, scope = this;
  // completed all functions for a token
  function complete() {
    i++;
    if(i < tokens.length) {
      tok();
    }else{
      callback();
    }
  }
  // run all middleware for a token
  function tok() {
    var token = tokens[i];
    var j = 0;
    function next(err) {
      if(err) return callback(err);
      j++;
      if(j < list.length) {
        exec();
      }else{
        complete();
      }
    }
    function exec() {
      var func = list[j];
      func.call(scope, token, tokens, meta, function(err) {
        next(err);
      });
    }
    exec();
  }
  tok();
}

function use(meta, toc) {
  var modifiers = [];
  if(meta.toc) {
    modifiers.push(middleware.toc.call(this, meta, toc));
  }
  if(meta.base) {
    modifiers.push(middleware.absolute.call(this, meta));
  }
  if(meta.pedantic) {
    modifiers.push(middleware.pedantic.call(this, meta));
  }

  meta.middleware = meta.middleware || [];
  var custom = [];
  meta.middleware.forEach(function(key) {
    var closure;
    if(middleware[key]) {
      closure = middleware[key].call(this, meta)
    }
    if(closure) custom.push(closure);
  })
  if(!~meta.middleware.indexOf('inspect') && this.inspect) {
    custom.push(middleware.inspect.call(this, meta));
  }
  modifiers = modifiers.concat(custom);
  return modifiers;
}

/**
 *  @func tokenize(meta, markdown, callback)
 *
 *  Generate source markdown tokens.
 *
 *  @param meta The meta data.
 *  @param markdown The markdown document.
 *  @param callback A callback function.
 */
function tokenize(meta, markdown, callback) {
  var cli = this;
  var lexer = new marked.Lexer(meta.marked);
  var tokens = lexer.lex(markdown);
  var gentok = [];
  if(meta.generator) {
    gentok = generator(meta);
  }
  // list of tokens for the table of contents
  var toc = [];

  // make footer links absolute
  var links = tokens.links;
  footer(meta, links);

  // build list of middleware
  var closures = use.call(this, meta, toc);
  // execute middleware
  run.call(this, tokens, meta, closures, function(err) {
    if(err) return callback(err);
    callback(null, {body: tokens, toc: toc, generator: gentok, links: links});
  });
}

var handlers = {
  md: md,
  txt: txt,
  man: man,
  html: html
}

function md(meta, tokens, callback) {
  var metadata = this.pandoc ? pandoc.meta.call(this, meta) : '';
  var toks = tokens.body.slice(0);
  toks = tokens.toc.concat(tokens.body);
  toks = toks.concat(tokens.generator);
  toks.links = tokens.links;
  var renderer = new markzero.MarkdownRenderer;
  var document = metadata + stringify(toks, renderer);
  callback(null, document);
}

function html(meta, tokens, callback) {
  var toks = tokens.body.slice(0);
  toks = tokens.toc.concat(tokens.body);
  toks = toks.concat(tokens.generator);
  toks.links = tokens.links;
  var renderer = new markzero.MarkdownRenderer;
  var document = marked.parser(toks);
  callback(null, document);
}

function txt(meta, tokens, callback) {
  var toks = tokens.body.slice(0);
  toks = tokens.toc.concat(tokens.body);
  toks = toks.concat(tokens.generator);
  toks.links = tokens.links;
  var renderer = new markzero.TextRenderer;
  var document = stringify(toks, renderer, true);
  var linklist = renderer.getLinks();
  document += stringify(linklist, renderer);
  callback(null, document);
}

function man(meta, tokens, callback) {
  var metadata = manual.meta.call(this, meta);
  var toks = tokens.body.slice(0);
  if(toks.length) {
    var token = toks[0];
    if(token.type !== 'heading') {
      toks.unshift({type: 'heading', text: 'DESCRIPTION', level: 1});
    }
  }
  toks.links = tokens.links;
  var renderer = new markzero.ManualRenderer;
  var document = metadata + stringify(toks, renderer, true);
  var linklist = renderer.getLinks();
  document += stringify(linklist, renderer);
  callback(null, document);
}

function build(format, meta, tokens, callback) {
  handlers[format].call(this, meta, tokens, callback);
}

module.exports.build = build;
module.exports.tokenize = tokenize;