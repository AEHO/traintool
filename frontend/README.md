# Modern Browser Application Development

## What is this? 
This is an example of how to organize and manage an application
that targets the browser as an application runtime. It will probably be helpful
if you think of this as _any_ client application you'd write for other
application runtimes: iOS, Android, Mac, Window, etc.

I took the Ember.js version of the
[TodoMVC](http://addyosmani.github.com/todomvc/), made the code more idiomatic
to Ember patterns, updated it to the latest development realease of Ember, and
wrapped it in a build tool process to address a number of annoyances with
building browser applications.

### Other examples

* [ember-brunch](https://github.com/cbosco/ember-brunch/tree/todomvc) - An Ember.js [brunch](http://brunch.io) skeleton with [mocha-phantomjs](http://metaskills.net/mocha-phantomjs/) tests

## The files in this project

### .gitignore
This project is managed with git. There are some files that don't
need to be checked into version control.
  
  * Development dependencies - specifically the node_modules folder. Locally,
    you'll  *need* something to help you manage development. Think of these like
    a C compiler, make file, etc for building applications whose deployment
    target is different than the development environment. In this project I'm
    using node, but you could really use any programming language that you're
    familiar with: ruby, python, Java – your call.

    I picked node for a one reason: I can't guarantee you'll know a language
    other than JavaScript.

    Granted, I can't guarantee you'll be familiar with the node environment
    either, but at the very least I'm fairly certain you know JavaScript and
    that lowers the barrier a bit.

  * Concatenated or Compiled files – specifically `build/application.js` and the
    contents of `dependencies/compiled/`
    
    `dependencies/compiled/` is where local template files (in Handlebars
    format) are written after they've been compiled into functions.

    `build/application.js` is the concatenated output of the the build process
    `(including the files inside of `dependencies/compiled/`).

### .jshintrc
This project uses [JSHint](http://www.jshint.com/) for
[linting](http://en.wikipedia.org/wiki/Lint_(software\)) to enforce some coding
standards and avoid common programming mistakes (like missing `var` statements
causing variables to leak into the global scope). These settings are stored as a
dot file so that while developing you can connect the project standards into
your editor of choice and when building for deployment this file can be used by
the build process and deployment can be stopped if it fails the linting process.

### package.json
I'm using node locally to aid the development process. Mostly
this file is used in development to track development dependencies and allow
other developers to quickly set up a development environment to get started.

I picked node because I can't guarantee you'll know a language other than
JavaScript. Granted, I can't guarantee you'll be familiar with the node
environment either, but at the very least I'm fairly certain you know JavaScript
and that lowers the barrier a bit. If you or your team is more familiar with
another language, feel free to use a build process in that language.

A build process doesn't need to be in the same language as your server
application(s). My current client application project at work talks to five
internal services at Groupon. We develop the UI entirely in isolation from these
services and use Ruby as a build tool. The services happen to be a mix of C,
Java, and Ruby. The UI is deployed on top of [nginx](http://nginx.org/en/) as
just a few files.

In fact, even if your client application only talks to one server application
and you're the developer for both I don't recommend you try to integrate them by
having the server application double as a build process. I personally find it
easier to reason about each application and write clean, decoupled code when the
two applications are kept apart.

### Gruntfile.js
[Grunt](http://gruntjs.com/) provides the structure to organize
tasks for actively developing, testing, and deploying this application. If you
want to read more about these, crack open this file - it's also heavily
commented.

### README.md
This file. You're reading it.

### dependencies/
The external libraries required to run the application: Ember,
Handlebars, and jQuery. I could have used a tool like
[Bower](http://twitter.github.com/bower/) to track and install these but am not.
No particular reason for that.

### build/index.html
During the development you can crack this open to play
around with the running application. It includes parts of the display not
managed by Ember and the necessary HTML elements to load the application's
resources: a single javascript file and a single css file.

It've found it immensely helpful to think of this as a kind of `main.c`

### build/base.css, build/bg.png
Copied directly from the TodoMVC project. These
are static resources downloaded via the browsers through the browser's 
`<link>` and `<script>` tags when someone opens `build/index.html`
in a browser.

### build/application.js
If you've just checked this project out you'll notice
there _is_ no `application.js` file but one is referenced in `build/index.html`
(which is a bit like your project's `main.c`) with `<script
src="application.js"></script>`. `application.js` is file that will be compiled
(and place here) as part of the build process in development and deployment. You
don't want this file under version control.

### app/
This is where the actual code of your browser application lives. The
application is also heavily commented. Start reading at `app/app.js` and work
your way through.

### test/
Er. Yes. Nothing here yet.

## Playing with this application.

You will need node installed as a development dependency. See [node's
site](http://nodejs.org/) for help with that.

One you have node installed run

```shell
npm install -g grunt-cli
```

To install the grunt task execution script available `g`lobally. Depending on how you
installed node on your system, you may need to use `sudo` to run this command.

Next, from this project folder run

```shell 
npm install
```

This will install the development dependencies listed in the `package.json` file
and store them in locally in `node_modules/`. You won't need `sudo` here.
`node_modules` is not tracked by version control.

Once all the development dependencies are installed you can start the
development tasks with

```shell 
grunt
```

Which will build development versions of your application and start watching 
for any changes. See `Gruntfile.js` for a deeper dive into what happens here.

Now you can open `build/index.html` in a browser.
