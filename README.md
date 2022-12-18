# Blog API

This is a RESTful API for a blog application, built using Node.js and MongoDB. It allows users to create, read, update, and delete blog posts, as well as add, read, update, and delete comments on existing posts.

## Dependencies

This project requires the following packages:

- express
- mongoose
- cors
- dotenv
- passport
- jsonwebtoken

## User Authentication

This API implements user authentication using the `passport` package and JSON Web Tokens (JWT). Users can sign up and log in to the API using the `/api/sign-up` and `/api/login` endpoints, respectively. Once a user is logged in, they can access protected routes by including a valid JWT in the `Authorization` header of their requests.

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone this repository: `git clone https://github.com/ogulcancicek/blog-api.git`
2. Install the dependencies: `npm install`
3. Start the server: `npm run serverStart`

## Endpoints

The following endpoints are available:

### Posts

- `GET /api/posts`: retrieve a list of all blog posts
- `POST /api/posts`: create a new blog post (protected route, requires a valid JWT in the `Authorization` header)
- `GET /api/posts/:id`: retrieve a specific blog post
- `PUT /api/posts/:id`: update a specific blog post (protected route, requires a valid JWT in the `Authorization` header)
- `DELETE /api/posts/:id`: delete a specific blog post (protected route, requires a valid JWT in the `Authorization` header)

### Comments

- `GET /api/posts/:postId/comments`: retrieve a list of comments for a specific blog post
- `GET /api/posts/:postId/comments/:commentId`: retrieve a specific comment for a specific blog post
- `POST /api/posts/:postId/comments`: add a comment to a specific blog post (protected route, requires a valid JWT in the `Authorization` header)
- `PUT /api/posts/:postId/comments/:commentId`: update a specific comment for a specific blog post (protected route, requires a valid JWT in the `Authorization` header)
- `DELETE /api/posts/:postId/comments/:commentId`: delete a specific comment from a blog post (protected route, requires a valid JWT in the `Authorization` header)
