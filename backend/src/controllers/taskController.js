const Task = require('../models/Task');

// Get all tasks with filtering and sorting
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, search, sortBy = 'createdAt' } = req.query;
    const userId = req.userId;

    // Build filter object
    const filter = { userId };

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Sort options
    const sortOptions = {};
    if (sortBy === 'dueDate') {
      sortOptions.dueDate = 1;
    } else if (sortBy === 'priority') {
      sortOptions.priority = -1;
    } else {
      sortOptions.createdAt = -1;
    }

    const tasks = await Task.find(filter).sort(sortOptions);

    res.json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if task belongs to user
    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to access this task' });
    }

    res.json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate, tags } = req.body;
    const userId = req.userId;

    const task = new Task({
      userId,
      title,
      description,
      priority,
      status,
      dueDate,
      tags: tags || [],
    });

    await task.save();

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if task belongs to user
    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    // Update fields
    const { title, description, priority, status, dueDate, tags, isCompleted } = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;
    if (tags) task.tags = tags;
    if (isCompleted !== undefined) task.isCompleted = isCompleted;

    await task.save();

    res.json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if task belongs to user
    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get task statistics
exports.getTaskStats = async (req, res) => {
  try {
    const userId = req.userId;

    const stats = await Task.aggregate([
      { $match: { userId: require('mongoose').Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] },
          },
          todo: {
            $sum: { $cond: [{ $eq: ['$status', 'todo'] }, 1, 0] },
          },
          highPriority: {
            $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] },
          },
        },
      },
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        total: 0,
        completed: 0,
        inProgress: 0,
        todo: 0,
        highPriority: 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
