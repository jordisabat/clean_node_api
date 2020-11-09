# Reply survey

> ## Success story:
1. ⛔️ Receive a ** PUT ** request on route ** / api / surveys / {survey_id} / results **
1. ⛔️ Validates if the request was made by a user
1. ⛔️ Validates if the answer is a valid value
1. ⛔️ Create a poll result with the data provided
1. ⛔️ Returns 200 with poll result data

> ## Exceptions:
1. ⛔️ Returns 404 error if the API does not exist
1. ⛔️ Returns error 403 if not a user
1. ⛔️ Returns error 500 if the response sent by the client is an invalid response
1. ⛔️ Returns error 500 if an error occurs when trying to create the survey result