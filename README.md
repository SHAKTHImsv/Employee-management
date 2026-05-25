# Task Management Application

A full-stack task management application built with React (frontend) and Node.js/Express.js (backend) with MongoDB database. This application allows users to create, update, delete, and manage daily tasks with priority, due date, and status options.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Task Filtering**: Filter tasks by status (To Do, In Progress, Completed) and priority (Low, Medium, High)
- **Task Search**: Search tasks by title or description
- **Task Sorting**: Sort tasks by creation date, due date, or priority
- **Task Statistics**: View dashboard statistics for task overview
- **Responsive Design**: Mobile-friendly UI with clean and modern design
- **Input Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback
- **RESTful API**: Complete REST API with proper error responses

## Project Structure

```
employee_management_system/
├── backend/                          # Node.js/Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js    # Auth logic
│   │   │   └── taskController.js    # Task logic
│   │   ├── middleware/
│   │   │   └── auth.js              # JWT verification
│   │   ├── models/
│   │   │   ├── User.js              # User schema
│   │   │   └── Task.js              # Task schema
│   │   ├── routes/
│   │   │   ├── auth.js              # Auth endpoints
│   │   │   └── tasks.js             # Task endpoints
│   │   ├── utils/
│   │   │   └── validators.js        # Input validation
│   │   └── server.js                # Express app
│   ├── .env.example                 # Environment variables template
│   └── package.json                 # Dependencies
│
└── frontend/                         # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── PrivateRoute.js       # Protected routes
    │   │   ├── TaskForm.js           # Task form component
    │   │   ├── TaskList.js           # Tasks display
    │   │   ├── TaskFilters.js        # Filter controls
    │   │   └── TaskStats.js          # Statistics display
    │   ├── context/
    │   │   └── AuthContext.js        # Auth state management
    │   ├── pages/
    │   │   ├── Login.js              # Login page
    │   │   ├── Register.js           # Registration page
    │   │   └── Dashboard.js          # Main dashboard
    │   ├── services/
    │   │   └── api.js                # API client
    │   ├── styles/
    │   │   ├── index.css             # Global styles
    │   │   ├── Auth.css              # Auth pages styles
    │   │   ├── Dashboard.css         # Dashboard styles
    │   │   ├── TaskForm.css          # Form styles
    │   │   ├── TaskList.css          # List styles
    │   │   ├── TaskFilters.css       # Filter styles
    │   │   └── TaskStats.css         # Stats styles
    │   ├── App.js                    # Main app component
    │   └── index.js                  # React entry point
    ├── public/
    │   └── index.html                # HTML template
    └── package.json                  # Dependencies
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB URI and JWT secret:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task_management
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
   NODE_ENV=development
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

The server will start at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Tasks
- `GET /api/tasks` - Get all tasks with optional filters
  - Query params: `status`, `priority`, `search`, `sortBy`
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

## Usage

1. **Register**: Create a new account with name, email, and password
2. **Login**: Log in with your credentials
3. **Create Task**: Click "Add New Task" and fill in the form
4. **Manage Tasks**: 
   - Edit tasks by clicking the "Edit" button
   - Delete tasks by clicking the "Delete" button
   - Change task status and priority inline
5. **Filter & Search**: Use filters and search to find specific tasks
6. **View Statistics**: Check the dashboard for task statistics

## Task Properties

Each task has the following properties:

- **Title**: Task name (required, max 100 characters)
- **Description**: Detailed task description (optional, max 500 characters)
- **Priority**: Low, Medium, High (default: Medium)
- **Status**: To Do, In Progress, Completed (default: To Do)
- **Due Date**: Optional deadline for the task
- **Tags**: Comma-separated labels for categorization

## Validation Rules

### Register/Login
- Email must be valid format
- Password must be at least 6 characters long

### Tasks
- Title is required (max 100 characters)
- Description is optional (max 500 characters)
- Priority must be: low, medium, or high
- Status must be: todo, in-progress, or completed
- Due date must be a valid date

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- Protected routes with middleware
- Input validation on both client and server
- CORS enabled for API access

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- express-validator
- dotenv

### Frontend
- React
- React Router
- Axios
- CSS3 (Grid, Flexbox)
- Context API for state management

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task_management
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## File Size Limits

- Task title: Maximum 100 characters
- Task description: Maximum 500 characters

## Error Handling

The application includes comprehensive error handling:

- Validation errors with specific messages
- Authentication errors with clear messages
- Database errors with user-friendly responses
- Network error handling in the frontend

## Future Enhancements

- Task categories/projects
- Task reminders and notifications
- Recurring tasks
- Task attachments
- Collaboration features
- Dark mode
- Export tasks to CSV/PDF
- Advanced analytics

## License

MIT License

## Support

For issues or questions, please create an issue in the project repository.

---

**Happy task managing!** 📋✨
