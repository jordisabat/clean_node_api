# List surveys

> ## Success story:
1. ⛔️ Receive a ** GET ** request on route ** / api / surveys **
1. ⛔️ Validates if the request was made by a user
1. ⛔️ Returns 200 with survey data

> ## Exceptions:
1. ⛔️ Returns error 404 if the API does not exist
1. ⛔️ Returns error 403 if not a user
1. ⛔️ Returns error 500 if it fails to list surveys