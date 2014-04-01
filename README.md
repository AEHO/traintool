# [TrainTool](https://gup-traintool.appspot.com/) ![Imgur](http://i.imgur.com/qnDCHEs.png)

> Web tool to create, manage and share yours workouts.


## Building

Prepare de backend:

```bash
$ make traintool/
$ ./traintool/runtests
```

Prepare the frontend:

```bash
$ cd traintool/src/frontend
$ npm install
$ bower install
$ grunt compile && grunt test
```

For running the server there's a shellscript script for that:

```bash
$ ./traintool/runserver
```

If you're not a unix user, read the file and do it with your hands, it's pretty easy. You just have to activate the virtual environment and then go to the app engine's lib and then run the `dev_appserver` referencing to the directory where there's the `app.yaml` file, i.e, at `traintool/src`.

The server will be running both on port `8000` and `8080`, being the first for admin stuff and the second for the application *per se*.

## License

**GNU GPL 2**
