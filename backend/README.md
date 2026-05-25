# Task Management Backend

A Node.js/Express.js backend API for the Task Management Application with MongoDB integration.

## Features

- User authentication with JWT
- RESTful API endpoints
- MongoDB data persistence
- Input validation
- Error handling
- Comprehensive logging

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Configure environment variables in `.env`

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Tasks
- `GET /api/tasks` - Get all tasks with filters
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get statistics

## Dependencies

- express: Web framework
- mongoose: MongoDB ORM
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- express-validator: Input validation
- dotenv: Environment variables
- cors: Cross-origin requests

## Development Dependencies

- nodemon: Auto-reload server

## Project Structure

```
src/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── taskController.js  # Task operations
├── middleware/
│   └── auth.js            # JWT verification
├── models/
│   ├── User.js            # User schema
│   └── Task.js            # Task schema
├── routes/
│   ├── auth.js            # Auth routes
│   └── tasks.js           # Task routes
├── utils/
│   └── validators.js      # Input validation
└── server.js              # Express app setup
```

## Error Handling

All endpoints return JSON responses with appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 500: Server error

## Security

- Passwords are hashed with bcryptjs (10 salt rounds)
- JWT tokens expire after 7 days
- Environment variables for sensitive data
- Input validation on all endpoints
- CORS enabled

---

For the full project documentation, see the main README.md
