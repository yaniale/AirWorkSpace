# AirWorkSpace

## Desing and Plannification

Miro project
Figma desing: https://www.figma.com/file/aKL5w0Dbwe81i4g5MXmGR6/AirWorkSpace?node-id=0%3A1

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
