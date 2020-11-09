# Survey result

> ## Success story:
1. ⛔️ Receive a ** GET ** request on route ** / api / surveys / {survey_id} / results **
1. ⛔️ Validates if the request was made by a user
1. ⛔️ Returns 200 with survey result data

> ## Exceptions:
1. ⛔️ Returns 404 error if the API does not exist
1. ⛔️ Returns error 403 if not a user
1. ⛔️ Returns error 500 if an error occurs when trying to list the survey result