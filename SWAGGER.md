YourArtToy - ArtToy PreOrder System API 1.0.0 OAS3 A RESTful API for Art Toy
Pre-Order System with user authentication and role-based authorization. Supports
both admin and member user roles with different access levels.

Contact YourArtToy API Support ISC Servers

http://localhost:5000/api/v1 - Development server Authorize Art Toys Art Toy
management API endpoints

GET /arttoys Get all art toys

Retrieve all available art toys. Accessible by all users.

Parameters Try it out No parameters

Responses Code Description Links 200 List of art toys

Media type

application/json Controls Accept header. Example Value Schema { "success": true,
"count": 0, "data": [ { "_id": "string", "sku": "string", "name": "string",
"description": "string", "arrivalDate": "2025-11-13", "availableQuota": 0,
"posterPicture": "string", "createdAt": "2025-11-13T16:09:19.878Z", "updatedAt":
"2025-11-13T16:09:19.878Z" } ] } No links 500 Server error

No links

POST /arttoys Create a new art toy

Create a new art toy. Only accessible by admin users. Arrival date must not be
earlier than current date.

Parameters Try it out No parameters

Request body

application/json Example Value Schema { "sku": "string", "name": "string",
"description": "string", "arrivalDate": "2025-11-13", "availableQuota": 0,
"posterPicture": "string" } Responses Code Description Links 201 Art toy created
successfully

Media type

application/json Controls Accept header. Example Value Schema { "success": true,
"data": { "\_id": "string", "sku": "string", "name": "string", "description":
"string", "arrivalDate": "2025-11-13", "availableQuota": 0, "posterPicture":
"string", "createdAt": "2025-11-13T16:09:19.882Z", "updatedAt":
"2025-11-13T16:09:19.882Z" } } No links 400 Invalid input or arrival date is in
the past

No links 401 Not authorized

No links 403 Admin access required

No links

GET /arttoys/{id} Get an art toy by ID

Retrieve details of a specific art toy. Accessible by all users.

Parameters Try it out Name Description id \* string (path) Art toy ID

id Responses Code Description Links 200 Art toy details retrieved successfully

Media type

application/json Controls Accept header. Example Value Schema { "success": true,
"data": { "\_id": "string", "sku": "string", "name": "string", "description":
"string", "arrivalDate": "2025-11-13", "availableQuota": 0, "posterPicture":
"string", "createdAt": "2025-11-13T16:09:19.884Z", "updatedAt":
"2025-11-13T16:09:19.884Z" } } No links 404 Art toy not found

No links

PUT /arttoys/{id} Update an art toy

Update an existing art toy. Only accessible by admin users.

Parameters Try it out Name Description id \* string (path) Art toy ID

id Request body

application/json Example Value Schema { "sku": "string", "name": "string",
"description": "string", "arrivalDate": "2025-11-13", "availableQuota": 0,
"posterPicture": "string" } Responses Code Description Links 200 Art toy updated
successfully

Media type

application/json Controls Accept header. Example Value Schema { "success": true,
"data": { "\_id": "string", "sku": "string", "name": "string", "description":
"string", "arrivalDate": "2025-11-13", "availableQuota": 0, "posterPicture":
"string", "createdAt": "2025-11-13T16:09:19.887Z", "updatedAt":
"2025-11-13T16:09:19.887Z" } } No links 400 Invalid input or arrival date is in
the past

No links 401 Not authorized

No links 403 Admin access required

No links 404 Art toy not found

No links

DELETE /arttoys/{id} Delete an art toy

Delete an art toy. Only accessible by admin users.

Parameters Try it out Name Description id \* string (path) Art toy ID

id Responses Code Description Links 200 Art toy deleted successfully

Media type

application/json Controls Accept header. Example Value Schema { "success": true,
"message": "string" } No links 401 Not authorized

No links 403 Admin access required

No links 404 Art toy not found

No links Authentication The authentication API

POST /auth/register Create a new user

Parameters Try it out No parameters

Request body

application/json Example Value Schema { "name": "string", "email": "string",
"tel": "string", "role": "member", "password": "string", "createdAt":
"2023-08-20" } Responses Code Description Links 201 The user was successfully
created

Media type

application/json Controls Accept header. Example Value Schema { "success": true,
"\_id": "string", "name": "string", "email": "string", "token": "string" } No
links 400 Bad request

No links 500 Some server error

No links

POST /auth/login Log-in to the system

Parameters Try it out No parameters

Request body

application/json Example Value Schema { "email": "string", "password": "string"
} Responses Code Description Links 200 Log-in Successfully

Media type

application/json Controls Accept header. Example Value Schema { "success": true,
"\_id": "string", "name": "string", "email": "string", "token": "string" } No
links 400 Bad request

No links 401 Invalid credentials

No links 500 Some server error

No links

GET /auth/logout Log out user

Parameters Try it out No parameters

Responses Code Description Links 200 Logged out successfully

No links 401 Not authorized

No links

GET /auth/me Return information about current user

Parameters Try it out No parameters

Responses Code Description Links 200 Current user profile

Media type

application/json Controls Accept header. Example Value Schema { "success": true,
"data": { "name": "string", "email": "string", "tel": "string", "role":
"member", "password": "string", "createdAt": "2023-08-20" } } No links 401 Not
authorized

No links 500 Some server error

No links Orders Order management API endpoints

GET /orders Get all orders

Retrieve orders based on user role:

Admin users can view all orders Member users can only view their own orders
Parameters Try it out No parameters

Responses Code Description Links 200 List of orders retrieved successfully

Media type

application/json Controls Accept header. Example Value Schema { "success": true,
"count": 0, "data": [ { "_id": "string", "user": { "_id": "string", "name":
"string", "email": "string" }, "artToy": { "_id": "string", "sku": "string",
"name": "string", "description": "string", "arrivalDate":
"2025-11-13T16:09:19.896Z", "availableQuota": 0 }, "orderAmount": 0,
"createdAt": "2025-11-13T16:09:19.896Z", "updatedAt": "2025-11-13T16:09:19.896Z"
} ] } No links 401 Not authorized

No links 500 Server Error

No links

POST /orders Create a new order

Create a new order for an art toy (member only)

Parameters Try it out No parameters

Request body

application/json Example Value Schema { "artToy": "string", "orderAmount": 5 }
Responses Code Description Links 201 Order created successfully

Media type

application/json Controls Accept header. Example Value Schema { "success": true,
"data": { "\_id": "string", "user": { "\_id": "string", "name": "string",
"email": "string" }, "artToy": { "\_id": "string", "sku": "string", "name":
"string", "description": "string", "availableQuota": 0 }, "orderAmount": 0,
"createdAt": "2025-11-13T16:09:19.900Z", "updatedAt": "2025-11-13T16:09:19.900Z"
} } No links 400 Invalid request - Order amount must be between 1-5 or quota
exceeded

No links 401 Not authorized - Member access required

No links 404 Art toy not found

No links 500 Server Error

No links

GET /orders/{id} Get an order by ID (admin can view any order, member can only
view their own)

Parameters Try it out Name Description id \* string (path) ID of the order to
view

id Responses Code Description Links 200 Returns the order details

Media type

application/json Controls Accept header. Example Value Schema { "success": true,
"data": { "\_id": "string", "user": "string", "artToy": "string", "orderAmount":
5, "createdAt": "2025-11-13T16:09:19.902Z", "updatedAt":
"2025-11-13T16:09:19.902Z" } } No links 401 Unauthorized

No links 404 Order not found

No links

PUT /orders/{id} Update order (admin can update any order, member can only
update their own)

Parameters Try it out Name Description id \* string (path) ID of the order to
update

id Request body

application/json Example Value Schema { "orderAmount": 5 } Responses Code
Description Links 200 Order updated successfully

Media type

application/json Controls Accept header. Example Value Schema { "success": true,
"data": { "\_id": "string", "user": "string", "artToy": "string", "orderAmount":
5, "createdAt": "2025-11-13T16:09:19.905Z", "updatedAt":
"2025-11-13T16:09:19.905Z" } } No links 400 Validation error or quota exceeded

No links 401 Unauthorized

No links 404 Order not found

No links

DELETE /orders/{id} Delete order (admin can delete any order, member can only
delete their own)

Parameters Try it out Name Description id \* string (path) ID of the order to
delete

id Responses Code Description Links 200 Order deleted successfully

No links 401 Unauthorized

No links 404 Order not found

No links

Schemas
