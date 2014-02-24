rdm(1)
======

Markdown partial generator (readme).

Designed to generate markdown documents from a series of partials. Partials are defined within a `readme` section of `package.json`.

A partial may be one of:

* `string`: A string literal.
* `property`: A property reference.
* `include`: Include a file, normally a markdown document but not necessarily.
* `script`: Execute a command and use `stdout` as the content.
* `require`: Require a `.js` module or a `.json` file.

See [usage](#usage) for command line options.

## Install```
npm install rdm
```

## Test```
npm test
```

## ConfigurationThis document was generated with the following configuration:

```json
{
  "title": "rdm(1)",
  "pedantic": true,
  "includes": "readme",
  "links": "links.md",
  "toc": true,
  "base": "https://github.com/freeformsystems/rdm",
  "partial": [
    {
      "property": "description"
    },
    {
      "include": "introduction.md"
    },
    {
      "include": "install.md"
    },
    {
      "include": "test.md"
    },
    "## Configuration\n\nThis document was generated with the following configuration:",
    {
      "property": "readme",
      "stringify": true,
      "format": "```json\n%s\n```"
    },
    "## Usage",
    {
      "script": "rdm --help",
      "type": "pre",
      "format": "```\n%s\n```"
    },
    "## Manual",
    {
      "env": {
        "cli_toolkit_help_style": "markdown",
        "cli_toolkit_help_markdown_title": true,
        "cli_toolkit_help_markdown_header": "###"
      },
      "script": "rdm --help",
      "pedantic": false
    },
    {
      "include": "license.md"
    },
    {
      "comment": "Includes path is set to *readme* so drop down a directory",
      "include": "../LICENSE"
    },
    {
      "include": "links.md"
    }
  ]
}
```

## Usage```
Generate markdown documents from partials.

Designed for readme documents but may be used for any markdown document.

Usage: rdm [-fp] [--force] [--print] [-o=file] file ...

Options:
 -f, --force        Force overwrite.
 -p, --print        Print to stdout.
 -t, --title=[title]
                    Document title.
 -o, --output=[file]
                    Output file, default is README.md in the working directory.
     --color        Control terminal color.
     --debug        Enable debugging.
     --help         Display this help and exit.
     --version      Output version information and exit.

Report bugs to muji <noop@xpm.io>.
```

## ManualGenerate markdown documents from partials.

Designed for readme documents but may be used for any markdown document.

### Usage```
rdm [-fp] [--force] [--print] [-o=file] file ...
```

### Options* `-f, --force`: Force overwrite.
* `-p, --print`: Print to stdout.
* `-t, --title=[title]`: Document title.
* `-o, --output=[file]`: Output file, default is README.md in the working directory.
* `    --color`: Control terminal color.
* `    --debug`: Enable debugging.
* `    --help`: Display this help and exit.
* `    --version`: Output version information and exit.

### BugsReport bugs to muji <noop@xpm.io>.

## LicenseEverything is [MIT](http://en.wikipedia.org/wiki/MIT_License). Read the [license](/LICENSE) if you feel inclined.

The MIT License (MIT)

Copyright (c) 2014 Freeform Systems

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[command]: https://github.com/freeformsystems/cli-command
[usage]: https://github.com/freeformsystems/rdm#usage.
