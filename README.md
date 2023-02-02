Login - Authentication

TDD (Test Driven Development)

Happy Path

### Use Cases

  [x] 1. Email exists and password match
  [x] 2. With a token 
  [x] 3. Token with a valid secret key
  [x] 4. With a valid token (user exists on payload)
  [x] 5. Existing user accessing others endpoints with fake token


Unhappy Path
  
  ### Use Cases
  
  [x]  1. No email and/or password
  [x]  2. No email but with password
  [x]  3. With email but with no password
  [x]  4. With email and password, but email does not exists
  [x]  5. With a valid email, but password does not match
  [x]  6. With no token
  [x]  7. With a token expired
  [x]  8. Token with a invalid secret key
  [x]  9. With an invalid token (user does not exist on payload)
  [x]  10. No existing user accessing others endpoints with fake token
  


    