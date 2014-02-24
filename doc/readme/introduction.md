```
npm i -g rdm
```

Designed to generate markdown documents from a series of partials. 

Read [partials](#partials) to learn how to define partials or get a quick feel by checking the [configuration](#configuration) that created this document, see [usage](#usage) for an abbreviated look at the command line options, the [manual](#manual) section is the result of generating program help for `rdm(1)` as markdown it illustrates the result of running an executable with a specific environment configuration.

Use this program to:

1. Concatenate multiple markdown documents into a single file.
2. Generate a table of contents for markdown document(s).
3. Include the output of a shell program, great for examples or program usage.
4. Keep your readme in sync with your code and prevent redundant effort with code samples.
5. Convert relative links to absolute links so your readme documents work when displayed on the [npm][npm] website.

This program was built using the [command][command] module:

> Command execution for command line interfaces, a component of the toolkit.

If you care for excellent documentation and write command line interfaces you should check it out.