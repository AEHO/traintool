# Contributing

> How to help us create cool stuff

This file will guide newcomers to contribute to the project. We don't expect to be prohibitive with these set of rules. We just want to make things more organized.

## So...

The process:

1.	Fork it,
2.	hack it,
3.	lint and test it,
4.	Push to your fork,
5.	Submit a pull request.

Some details:

- 	Never ever commit to Master;
- 	Use branch naming conventions. Organization is great when working with other dudes.

```
wip       Works in progress; stuff I know won't be finished soon
feat      Feature I'm adding or expanding
bug       Bug fix or experiment
junk      Throwaway branch created to experiment
```

- Don't forget the commit conventions

```
First line with a maximum of 50 char (desirable)
~~~ blank line ~~~
Descriptive text with 72 char ruller.
```

- When comitting something pertinent to an issue (fixes a bug, etc) include its number.
[A reference on this](https://help.github.com/articles/closing-issues-via-commit-messages)


- When it is python code, remember that checking the code styling conventions are necessary. The same applies for javascript and so on.

Particularly for python, [pep8](http://legacy.python.org/dev/peps/pep-0008/) it with something like the following:

```bash
$ pip install pep8
$ find . \( -path ./google_appengine -o -path ./.env \) -prune -o -name '*.py' -print | xargs pep8 --statistics
```

pep8 is the minimum, pep8 + [pep257](http://legacy.python.org/dev/peps/pep-0257/) the desirable.

- For JS, there's also codding conventions. [Douglas Crockford's conventions](http://javascript.crockford.com/code.html) are great. [jshint](https://github.com/jshint/jshint/)(a fork of jslint but with a little more rigor) is the minimum and [jslint](http://www.jslint.com/lint.html) the desirable. 


# Most important

**Have fun!**
