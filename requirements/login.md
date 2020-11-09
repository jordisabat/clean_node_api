# Login

> ## Success story:
1. ✅ Receive a ** POST ** request on route ** / api / login **
1. ✅ Validates mandatory data ** email ** and ** password **
1. ✅ Validate that the ** email ** field is a valid email
1. ✅ Search for the user with the provided email and password
1. ✅ Generate an access token from the user ID
1. ✅ Update user data with the generated access token
1. ✅ Returns 200 with the access token

> ## Exceptions:
1. ✅ Returns error 404 if the API does not exist
1. ✅ Returns error 400 if ** email ** or ** password ** is not provided by the client
1. ✅ Returns error 400 if the field ** email ** is an invalid email
1. ✅ Returns error 401 if it does not find a user with the data provided
1. ✅ Returns error 500 if an error occurs when trying to generate the access token
1. ✅ Returns error 500 if an error occurs when trying to update the user with the generated access token