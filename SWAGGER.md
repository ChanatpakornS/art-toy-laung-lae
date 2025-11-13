# Backend docs reference

YourArtToy - ArtToy PreOrder System API 1.0.0 OAS3 A RESTful API for Art Toy
Pre-Order System with user authentication and role-based authorization. Supports
both admin and member user roles with different access levels.

Contact YourArtToy API Support ISC Servers

http://localhost:5000/api/v1 - Development server Authorize Art Toys Art Toy
management API endpoints

GET /arttoys Get all art toys

POST /arttoys Create a new art toy

GET /arttoys/{id} Get an art toy by ID

PUT /arttoys/{id} Update an art toy

DELETE /arttoys/{id} Delete an art toy

Authentication The authentication API

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

GET /auth/me Return information about current user

Orders Order management API endpoints

GET /orders Get all orders

POST /orders Create a new order

GET /orders/{id} Get an order by ID (admin can view any order, member can only
view their own)

PUT /orders/{id} Update order (admin can update any order, member can only
update their own)

DELETE /orders/{id} Delete order (admin can delete any order, member can only
delete their own)

Schemas ArtToy User Order
