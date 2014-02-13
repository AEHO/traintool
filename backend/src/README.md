TrainTool Backend
===

Backend code that will run on GAE to provide the basic webservice for the application.


Structure Explained
---
```
/..
  /appengine
    /api            -- webservice coding (endpoints full usage
                        and also Db modelling)
    /endpoints_proto_datastore -- proto datastore making easy
                                  to convert from ndb.Model to
                                  ProtoRPC messages object.
    /index          -- landing page
    /tests          -- test files
    app.yaml        -- GAE config
    main.py         -- routing
    settings.py     -- global config
    setup.sh        -- responsible for preparing the dev. environment
    requirements.txt  --  packages required
``` 


Preparing the Development environment
---
1.  Run the shell script

```bash
$ ./setup.sh
```

2.  Activate the virtualenv environment

```bash
$ source venv/bin/activate
```

3. Run the tests

```bash
$ nosetests --with-doctest --verbose
```  

4.  Initialize the server

```bash
$ ./runserver.sh
```


External Dependency
---
This project relies on [endpoints-proto-datastore](https://github.com/GoogleCloudPlatform/endpoints-proto-datastore)(Apache 2.0 License), which extends the functionality provided by ndb.Model to not being needed to create ProtoRPC request objects.

It also uses the skeleton of [testable_appengine](https://github.com/rbanffy/testable_appengine)


Considerations
---
- The creator choosed to use webapp2 because we'll don't need other huge features that django could provide to us. As we just need a handler with a few tools out of the box, webapp2 fits perfectly. For other cases django might fit better for the development.
