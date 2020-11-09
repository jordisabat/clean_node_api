# Create survey

> ## Success story:
1. ⛔️ Receive a ** POST ** request on route ** / api / surveys **
1. ⛔️ Validates if the request was made by an admin
1. ⛔️ Validates mandatory data ** question ** and ** answers **
1. ⛔️ Create a poll with the data provided
1. ⛔️ Returns 200 with poll data

> ## Exceptions:
1. ⛔️ Returns 404 error if the API does not exist
1. ⛔️ Returns error 403 if the user is not admin
1. ⛔️ Returns 400 error if ** question ** or ** answers ** are not provided by the client
1. ⛔️ Returns error 500 if an error occurs when trying to create the poll