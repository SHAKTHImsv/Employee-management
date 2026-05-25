# Development Guide

## Code Standards

### Backend (Node.js/Express)

#### File Organization
- Models in `src/models/`
- Routes in `src/routes/`
- Controllers in `src/controllers/`
- Middleware in `src/middleware/`
- Configuration in `src/config/`
- Utilities in `src/utils/`

#### Naming Conventions
- Files: camelCase (e.g., `authController.js`)
- Classes: PascalCase (e.g., `User`, `Task`)
- Functions: camelCase (e.g., `getUserById()`)
- Constants: UPPER_SNAKE_CASE (e.g., `JWT_SECRET`)

#### Error Handling
```javascript
try {
  // operation
  res.status(200).json({ success: true, data });
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ message: error.message });
}
```

#### Validation
- Use `express-validator` for all inputs
- Validate before processing
- Return clear error messages

### Frontend (React)

#### Component Structure
```javascript
import React, { useState } from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2, onAction }) => {
  const [state, setState] = useState(null);

  const handleEvent = () => {
    // handler logic
  };

  return <div>{/* JSX */}</div>;
};

export default ComponentName;
```

#### Naming Conventions
- Components: PascalCase (e.g., `TaskForm.js`)
- Hooks: camelCase (e.g., `useAuth`)
- Event handlers: `handleXxx` (e.g., `handleSubmit`)
- State setters: From `useState` (e.g., `setTasks`)

#### Styling
- One CSS file per component
- Use descriptive class names
- Follow BEM methodology for complex components
- Mobile-first responsive design

#### API Calls
```javascript
import { taskAPI } from '../services/api';

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks(filters);
      setTasks(response.data.tasks);
    } catch (error) {
      setError(error.message);
    }
  };
  fetchTasks();
}, []);
```

## Database Schema

### User Schema
```
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Schema
```
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  description: String,
  status: String (enum: 'todo', 'in-progress', 'completed'),
  priority: String (enum: 'low', 'medium', 'high'),
  dueDate: Date,
  tags: [String],
  isCompleted: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [{ field: "fieldName", message: "Error details" }]
}
```

## Testing Checklist

### Backend
- [ ] All endpoints return proper status codes
- [ ] Validation works correctly
- [ ] Authentication middleware functions
- [ ] Database operations work
- [ ] Error handling returns proper responses

### Frontend
- [ ] Forms validate input correctly
- [ ] API calls return expected data
- [ ] Error messages display properly
- [ ] Filters and search work
- [ ] Responsive design works on all breakpoints

## Performance Tips

### Backend
- Use database indexes for common queries
- Implement pagination for large datasets
- Cache frequently accessed data
- Optimize database queries

### Frontend
- Use React.memo for pure components
- Implement lazy loading for routes
- Optimize re-renders
- Minimize bundle size

## Security Considerations

### Backend
- Validate all inputs
- Hash passwords with bcrypt
- Use environment variables for secrets
- Implement rate limiting
- Use HTTPS in production
- Validate JWT tokens

### Frontend
- Store JWT tokens in httpOnly cookies (when possible)
- Never store sensitive data in localStorage
- Validate data before sending
- Use HTTPS in production
- Implement CSRF protection

## Git Workflow

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -m "Description"`
3. Push to branch: `git push origin feature/feature-name`
4. Create pull request
5. Merge after review

## Common Issues and Solutions

### Issue: Token expires during session
**Solution:** Implement token refresh mechanism

### Issue: CORS errors
**Solution:** Check CORS configuration on backend

### Issue: Images not displaying
**Solution:** Use absolute paths or CDN URLs

### Issue: Slow database queries
**Solution:** Add indexes, optimize queries, use pagination

## Debugging

### Backend
```bash
# Enable debug mode
DEBUG=* npm run dev

# Check console logs
console.log('Debug:', variable);
console.error('Error:', error);
```

### Frontend
- Use Chrome DevTools
- React Developer Tools extension
- Console for errors
- Network tab for API calls

## Documentation Standards

### Code Comments
```javascript
// Single line comment

/**
 * Function description
 * @param {type} param - Parameter description
 * @returns {type} Return value description
 */
```

### README Sections
- Overview
- Features
- Installation
- Usage
- API/Component documentation
- Troubleshooting
- License

---

Follow these guidelines to maintain code quality and consistency across the project.
