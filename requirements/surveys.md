# List surveys

> ## Success story:
1. ⛔️ Receive a ** GET ** request on route ** / api / surveys **
1. ⛔️ Validates if the request was made by a user
1. ⛔️ Returns 200 with poll data

> ## Exceptions:
1. ⛔️ Returns 404 error if the API does not exist
1. ⛔️ Returns error 403 if not a user
1. ⛔️ Returns 500 error if it fails to list polls