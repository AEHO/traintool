TrainTOOL Api
===
This file will elucidate all of the functionality beyonds the v1 API.


Making a Request
---

Authorizing
---

V1 Endpoints
===
Here it will be describe the **minimum** for using the API.
Latter we'll spend some more time on a wiki to describe it better.

Exercises
---
GET     /exercises
    * returns a list of the exercises *

GET     /exercise
    * params: **id** *
    * returns the exercise *

POST    /exercise
    * Updates or Create an Exercise at the Db *

DELETE  /exercise
    * Deletes an exercise with the matching ID *

General Considerations
---
- The supported format is only **JSON**

