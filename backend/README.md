# TrainTool Backend

> Backend code that will run on GAE to provide the basic webservice for the application.


## Preparing the Development environment

1.  Run the shell script

```bash
$ make
```

2.  Activate the virtualenv environment

```bash
$ source .env/bin/activate
```

3.  Initialize the server

```bash
$ ./runserver.sh
```

## Testing and Linting

For running all of the tests:

```bash
$ nosetests --verbose
```  

For linting and PEPing what matters:
```
$ find . \( -path ./lib -o -path ./.env \) -prune -o -name '*.py' -print | xargs pep8 --statistics
$ find . \( -path ./lib -o -path ./.env \) -prune -o -name '*.py' -print | xargs pep257 --ignore=D401
$ find . \( -path ./lib -o -path ./.env \) -prune -o -name '*.py' -print | xargs pylint
```

## External Dependency

This project relies on [endpoints-proto-datastore](https://github.com/GoogleCloudPlatform/endpoints-proto-datastore)(Apache 2.0 License), which extends the functionality provided by ndb.Model to not being needed to create ProtoRPC request objects.

It also uses the skeleton of [testable_appengine](https://github.com/rbanffy/testable_appengine).


## Considerations

- The creator choosed to use webapp2 because we'll don't need other huge features that django could provide to us. As we just need a handler with a few tools out of the box, webapp2 fits perfectly. For other cases django might fit better for the development.
