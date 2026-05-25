# Environment Setup Guide

## Prerequisites

Before setting up the application, ensure you have installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **MongoDB** (v4.4 or higher)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
   - Verify installation: `mongod --version`

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

## MongoDB Setup

### Local MongoDB Setup

1. **Install MongoDB Community Edition**
   - Windows: Download installer from mongodb.com and follow installation wizard
   - macOS: `brew install mongodb-community`
   - Linux: Follow distro-specific instructions

2. **Start MongoDB Service**
   - Windows: MongoDB should start automatically, or use `mongod`
   - macOS: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Verify Connection**
   ```bash
   mongosh
   # or
   mongo
   ```

### MongoDB Atlas (Cloud) Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get connection string
5. Replace `MONGODB_URI` in `.env` with your connection string

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` with your configuration:**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task_management
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
   NODE_ENV=development
   ```

   - `PORT`: Server port (default: 5000)
   - `MONGODB_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT (change in production!)
   - `NODE_ENV`: Environment (development/production)

5. **Start the server:**
   ```bash
   npm run dev
   ```

   Expected output:
   ```
   Server running on port 5000
   MongoDB connected successfully
   ```

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file (optional):**
   ```bash
   echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   The app will automatically open at `http://localhost:3000`

## Running Both Servers

**Option 1: Two Terminal Windows**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

**Option 2: Using concurrently (Optional)**

In root directory:
```bash
npm install -g concurrently
```

Then create a root `package.json`:
```json
{
  "scripts": {
    "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\""
  }
}
```

## Testing the Application

1. **Open browser:** http://localhost:3000
2. **Register:** Create a new account
3. **Login:** Use your credentials
4. **Create Task:** Test creating a new task
5. **Test Features:** Try filtering, searching, editing, and deleting

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running: `mongosh`
- Verify connection string in `.env`
- Check MongoDB credentials (if using Atlas)

### Backend Won't Start
- Check if port 5000 is in use: `netstat -ano | findstr :5000` (Windows)
- Change `PORT` in `.env` if 5000 is busy
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Frontend Won't Start
- Clear cache: `rm -rf node_modules .cache && npm install`
- Check if port 3000 is in use
- Ensure backend is running before starting frontend

### API Connection Error
- Check backend is running on http://localhost:5000
- Verify CORS is enabled
- Check network tab in browser DevTools

### CORS Issues
- Ensure backend has CORS middleware
- Check API URL in frontend `.env`
- Restart both servers

## Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Change `JWT_SECRET` to a secure random string
3. Use a managed MongoDB service (Atlas, etc.)
4. Deploy to: Heroku, AWS, DigitalOcean, or similar

### Frontend Deployment
1. Build: `npm run build`
2. Update `REACT_APP_API_URL` to production API URL
3. Deploy static files to: Vercel, Netlify, AWS S3, or similar

## Development Tips

1. **Use VS Code Extensions:**
   - ES7+ React/Redux/React-Native snippets
   - MongoDB for VS Code
   - REST Client

2. **API Testing:**
   - Use Postman or Insomnia
   - Create requests for all endpoints
   - Save as collections for testing

3. **Debugging:**
   - Use Chrome DevTools for frontend
   - Use `console.log()` for backend
   - Set breakpoints in VS Code debugger

4. **Version Control:**
   - Initialize git: `git init`
   - Create `.gitignore` to exclude node_modules, .env
   - Regular commits for backup

---

For more help, check the individual README files in backend/ and frontend/
