# Modern Browser Application Development

## The files in this project

### dependencies/bower_components
When bower in runned the installed dependencies will be placed here.

### build/index.html
During the development you can crack this open to play
around with the running application. It includes parts of the display not
managed by Ember and the necessary HTML elements to load the application's.
It've found it immensely helpful to think of this as a kind of `main.c`

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

```shell 
bower install
```

This will install the dependencies in the `bower.json` file
and store them in `dependencies/bower_components/`.

You will need ruby too, some download links and instructions
in the [official ruby download page](https://www.ruby-lang.org/en/downloads/),
ruby is used in this project by compass, a stylesheets compiler.

Our last dependencie is the [compass](http://compass-style.org/) itself, to install it
just run `gem install compass`.

Once all the development dependencies are installed you can start the
development tasks with

```shell 
grunt
```

Which will build development versions of your application and start watching 
for any changes. See `Gruntfile.js` for a deeper dive into what happens here.

Now you can open `build/index.html` in a browser.


##Credits

This project structure is based on [this example project](https://github.com/trek/ember-todos-with-build-tools-tests-and-other-modern-conveniences)