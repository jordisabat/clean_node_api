# SignUp

> ## Success story:
1. ✅ Receive a ** POST ** request on route ** / api / signup **
1. ✅ Validates mandatory data ** name **, ** email **, ** password ** and ** passwordConfirmation **
1. ✅ Validates that ** password ** and ** passwordConfirmation ** are the same
1. ✅ Validate that the ** email ** field is a valid email
1. ✅ Validates if a user already exists with the email provided
1. ✅ Generates an encrypted password (this password cannot be decrypted)
1. ✅ Create an account for the user with the data entered, replacing the password with the encrypted password
1. ✅ Generates an access token from the user ID
1. ✅ Updates user data with the generated access token
1. ✅ Returns 200 with the access token

> ## Exceptions:
1. ✅ Returns error 404 if the API does not exist
1. ✅ Returns error 400 if ** name **, ** email **, ** password ** or ** passwordConfirmation ** are not provided by the client
1. ✅ Returns error 400 if ** password ** and ** passwordConfirmation ** are not the same
1. ✅ Returns error 400 if the field ** email ** is an invalid email
1. ✅ Returns error 403 if the email provided is already in use
1. ✅ Returns error 500 if an error occurs when trying to generate an encrypted password
1. ✅ Returns error 500 if an error occurs when trying to create the user account
1. ✅ Returns error 500 if an error occurs when trying to generate the access token
1. ✅ Returns error 500 if an error occurs when trying to update the user with the generated access token