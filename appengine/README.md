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
    /media          -- static non-js/css
    /static         -- js/css
    /templates      -- html files
    /utils          -- tools
    app.yaml        -- GAE config
    main.py         -- routing
    settings.py     -- global config
``` 


Considerations
---
- The creator choosed to use webapp2 because we'll don't need other huge features that django could provide to us. As we just need a handler with a few tools out of the box, webapp2 fits perfectly. For other cases django might fit better for the development.