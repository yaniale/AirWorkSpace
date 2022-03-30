# AirWorkSpace

## Desing and Plannification

- Miro project: https://miro.com/app/board/uXjVOCCHrmY=/
- Figma desing: https://www.figma.com/file/aKL5w0Dbwe81i4g5MXmGR6/AirWorkSpace?node-id=0%3A1

## API Endpoints

All API Request must be prepended with `/api/`


### Authentication Endpoints

The Authentication flow for the application is:

### User Signup/Login

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION        | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     |       |      | User Signup        | `name`, `lastName`, `email`, `password`         | `token`
POST   | /auth/login      | -     |      | User Login         | `email`, `password`                             | `token`

### User Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET    | /user/profile/:id    | YES     | | Get My Profile            | - | `profile`
PATCH  | /user/profile/:id    | YES     | | Update My Profile            | - | `profile`
DELETE | /user/profile/:id    | YES     | Admin | Delete a user            | - |

### Center Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION        | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
GET   | /center           |       |      | Get all workspaces       | - | `workspaces`
GET   | /center/:id       |       |      | Get one workspace    | | `workspace` 
POST  | /center           | YES   | Host | Create a workspace  | `name` `type` `description` `photos` `location` `contact` `services` `ratePlan` | center created
PATCH | /center/:id       | YES   | Host | Update a workspace  |  |  workspace updated
DELETE | /center/:id      | YES   | Host | Delete a workspace  |   | 
POST  | /center/:id/booking  | YES   | User  | Create a booking    | `fromTime``toTime``type``ratePlan`  | Booked workspace
PATCH  | /center/:id/booking/:id/status  | YES   | Host/User  | Update booking status   |   | Updated workspace
POST  | /center/:id/rate  | YES   | Host | Create rateplans   | `name` `appliesTo` `fromDate``toDate` `description``rate` | ratePlan created
PUT  | /center/:id/rate/:id  | YES   | Host | Update rateplan   |  | ratePlan updated

### Services Endpoints

METHOD | ENDPOINT         | TOKEN | ROLE | DESCRIPTION              | POST PARAMS                                     | RETURNS
-------|------------------|-------|------|--------------------|-------------------------------------------------|--------------------
POST  | /service           | YES   | Admin  | Create a service  | `name` `icon`  | service created
PATCH | /service/:id       | YES   | Admin  | Update a service  |  |  service updated
DELETE | /service/:id      | YES   | Admin  | Delete a service  |   | 



