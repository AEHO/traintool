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
    /utils          -- tools
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

```
$ ./setup.sh
```

2.  Activate the virtualenv environment

```
$ source .env/bin/activate
```

3. Run the tests

```
$ nosetests --with-doctest --verbose
```  



External Dependency
---
This project relies on [endpointer-proto-datastore](https://github.com/GoogleCloudPlatform/endpoints-proto-datastore)(Apache 2.0 License), which extends the functionality provided by ndb.Model to not being needed to create ProtoRPC request objects.

It also uses the skeleton on [testable_appengine](https://github.com/rbanffy/testable_appengine)


Considerations
---
- The creator choosed to use webapp2 because we'll don't need other huge features that django could provide to us. As we just need a handler with a few tools out of the box, webapp2 fits perfectly. For other cases django might fit better for the development.
