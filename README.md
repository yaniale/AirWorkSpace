# AirWorkSpace

## API Endpoints

All API Request must be prepended with `/api/`


### Authentication Endpoints

The Authentication flow for the application is:

### User Signup/Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION        | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | YES   | Admin| User Signup        | `name`, `lastName`, `email`, `password`         | `token`
POST   | /auth/login      | -     |      | User Login         | `email`, `password`                             | `token`

### User Endpoints
