# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Backend

1. Copy environment file:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit `.env` and ensure MongoDB is running locally or update the URI to your MongoDB Atlas connection

### Step 3: Start Services

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The app opens automatically at `http://localhost:3000`

### Step 4: Use the Application

1. **Register**: Click "Register" and create an account
2. **Login**: Log in with your credentials
3. **Create Task**: Click "Add New Task" button
4. **Manage Tasks**: Edit, delete, filter, and search tasks

---

## 📁 Project Structure Overview

```
employee_management_system/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                     # MongoDB connection setup
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js         # User registration, login, auth logic
│   │   │   └── taskController.js         # CRUD operations for tasks
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.js                   # JWT authentication middleware
│   │   │
│   │   ├── models/
│   │   │   ├── User.js                   # User schema & password hashing
│   │   │   └── Task.js                   # Task schema with indexes
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.js                   # /api/auth/* endpoints
│   │   │   └── tasks.js                  # /api/tasks/* endpoints
│   │   │
│   │   ├── utils/
│   │   │   └── validators.js             # Input validation rules
│   │   │
│   │   ├── server.js                     # Express app setup & middleware
│   │   └── .env.example                  # Environment variables template
│   │
│   ├── package.json
│   ├── README.md                         # Backend documentation
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PrivateRoute.js           # Protected route wrapper
│   │   │   ├── TaskForm.js               # Create/edit task form
│   │   │   ├── TaskList.js               # Display tasks in grid
│   │   │   ├── TaskFilters.js            # Filter controls
│   │   │   └── TaskStats.js              # Dashboard statistics
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.js            # Global auth state management
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.js                  # Login page
│   │   │   ├── Register.js               # Registration page
│   │   │   └── Dashboard.js              # Main task dashboard
│   │   │
│   │   ├── services/
│   │   │   └── api.js                    # Axios instance & API methods
│   │   │
│   │   ├── styles/
│   │   │   ├── index.css                 # Global styles & resets
│   │   │   ├── Auth.css                  # Login/Register styling
│   │   │   ├── Dashboard.css             # Dashboard layout
│   │   │   ├── TaskForm.css              # Form styling
│   │   │   ├── TaskList.css              # Task card styling
│   │   │   ├── TaskFilters.css           # Filter controls styling
│   │   │   └── TaskStats.css             # Statistics cards styling
│   │   │
│   │   ├── App.js                        # Main app with routing
│   │   └── index.js                      # React entry point
│   │
│   ├── public/
│   │   └── index.html                    # HTML template
│   │
│   ├── package.json
│   ├── README.md                         # Frontend documentation
│   └── .gitignore
│
├── README.md                             # Main documentation
├── SETUP.md                              # Setup instructions
├── DEVELOPMENT.md                        # Development guidelines
├── QUICK_START.md                        # This file
└── .gitignore                            # Git ignore rules
```

---

## 🔑 Key Features Explained

### 1. Authentication
- **Register**: Create new account with name, email, password
- **Login**: Authenticate with email and password
- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: Dashboard accessible only to logged-in users

### 2. Task Management
**Create Tasks:**
- Title (required)
- Description (optional)
- Priority (Low/Medium/High)
- Status (To Do/In Progress/Completed)
- Due Date (optional)
- Tags (comma-separated)

**Edit/Update Tasks:**
- Click "Edit" button to modify task
- Change any property except userId
- Changes saved to database immediately

**Delete Tasks:**
- Click "Delete" button to remove task
- Permanently removes from database

### 3. Filtering & Search
**Filter Options:**
- By Status: All, To Do, In Progress, Completed
- By Priority: All, Low, Medium, High
- By Search: Title and description search
- Multiple filters work together

**Sorting:**
- Recently Created (default)
- By Due Date
- By Priority

### 4. Statistics Dashboard
- **Total Tasks**: Count of all tasks
- **Completed**: Number of completed tasks
- **In Progress**: Number of tasks being worked on
- **To Do**: Number of pending tasks
- **High Priority**: Count of high-priority tasks

---

## 🛠️ API Reference

### Authentication Endpoints

**Register**
```
POST /api/auth/register
Body: { name, email, password }
Response: { token, user }
```

**Login**
```
POST /api/auth/login
Body: { email, password }
Response: { token, user }
```

**Get Current User**
```
GET /api/auth/me
Headers: { Authorization: "Bearer TOKEN" }
Response: { user }
```

### Task Endpoints

**Get Tasks**
```
GET /api/tasks?status=todo&priority=high&search=work
Response: { tasks: [] }
```

**Get Single Task**
```
GET /api/tasks/:id
Response: { task }
```

**Create Task**
```
POST /api/tasks
Body: { title, description, priority, status, dueDate, tags }
Response: { task }
```

**Update Task**
```
PUT /api/tasks/:id
Body: { title, description, priority, status, dueDate, tags }
Response: { task }
```

**Delete Task**
```
DELETE /api/tasks/:id
Response: { message }
```

**Get Statistics**
```
GET /api/tasks/stats
Response: { stats: { total, completed, inProgress, todo, highPriority } }
```

---

## 💾 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (bcrypt hashed),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Tasks Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (references Users),
  title: String (max 100 chars),
  description: String (max 500 chars),
  status: String ("todo" | "in-progress" | "completed"),
  priority: String ("low" | "medium" | "high"),
  dueDate: Date (optional),
  tags: [String],
  isCompleted: Boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**Indexes:**
- `{ userId: 1, createdAt: -1 }` - Get user tasks by date
- `{ userId: 1, status: 1 }` - Filter by status
- `{ userId: 1, priority: 1 }` - Filter by priority

---

## 🔐 Security Features

### Backend Security
- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token authentication (expires in 7 days)
- ✅ CORS enabled for frontend access
- ✅ Input validation on all endpoints
- ✅ Environment variables for sensitive data

### Frontend Security
- ✅ Secure token storage in localStorage
- ✅ Protected routes with authentication check
- ✅ Input validation before sending to server
- ✅ Error handling without exposing sensitive info

---

## 🎨 UI Components

### Pages
1. **Login** - User authentication with form validation
2. **Register** - New user account creation
3. **Dashboard** - Main task management interface

### Components
1. **TaskForm** - Create and edit tasks
2. **TaskList** - Display tasks in responsive grid
3. **TaskFilters** - Filter and search controls
4. **TaskStats** - Statistics dashboard
5. **PrivateRoute** - Protected route wrapper

### Styling
- Responsive design (mobile, tablet, desktop)
- CSS Grid and Flexbox layouts
- Color-coded priorities and statuses
- Smooth animations and transitions
- Gradient backgrounds

---

## 🚨 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service or check connection string

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill process on port 5000 or change PORT in .env

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Check backend has CORS middleware and frontend API URL matches

### Form Validation Error
```
Validation errors not showing
```
**Solution:** Check backend response has errors array

### Tasks Not Loading
```
Empty task list
```
**Solutions:**
- Check user is authenticated (token in localStorage)
- Check MongoDB has data
- Check browser console for errors

---

## 📚 Documentation Files

- **README.md** - Full project documentation
- **SETUP.md** - Detailed setup instructions
- **DEVELOPMENT.md** - Development guidelines and standards
- **backend/README.md** - Backend-specific documentation
- **frontend/README.md** - Frontend-specific documentation
- **QUICK_START.md** - This quick reference guide

---

## 🎯 Next Steps

1. ✅ Follow the **Quick Start** section above
2. ✅ Create an account and test the app
3. ✅ Check **DEVELOPMENT.md** for coding standards
4. ✅ Read **SETUP.md** for production deployment
5. ✅ Customize and extend the features

---

## 📞 Support & Help

For more information, refer to:
- Backend documentation: `backend/README.md`
- Frontend documentation: `frontend/README.md`
- Setup guide: `SETUP.md`
- Development guide: `DEVELOPMENT.md`

Happy coding! 🚀
