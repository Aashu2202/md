// const express = require("express");
// const { handleGetAllUsers, handleCreateUser, handleUpdateUserById, handleDeleteUserById, validateUser } = require("../../controller/users/UsersController");

// const userrouter = express.Router();

// userrouter.get("/", handleGetAllUsers);
// userrouter.post("/", validateUser, handleCreateUser);
// userrouter.put("/:id", validateUser, handleUpdateUserById);
// userrouter.delete("/:id", handleDeleteUserById);

// module.exports = userrouter;


const express = require('express');
const { check, validationResult } = require('express-validator');
const client = require("../../db");

const router = express.Router();

// Validation middleware
const validateUser = [
  check('Email').isEmail().withMessage('Valid email is required'),
  check('First_name').notEmpty().withMessage('First name is required'),
  check('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  check('Password_confirmation').custom((value, { req }) => value === req.body.Password).withMessage('Passwords do not match')
];

// Get all users with pagination
router.get('/', async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const result = await client.query(
      'SELECT * FROM users LIMIT $1 OFFSET $2',
      [parseInt(limit, 10), parseInt(offset, 10)]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error in GET request:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Create user
router.post('/', validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Email, Provider, First_name, Last_name, Password, Subscription_plan, Subscription_source, subscription_duration, AdminSubscriptionFlag, PreventAutoSubScriptionVerfify, Tester, AllDetails } = req.body;

  try {
    const result = await client.query(
      'INSERT INTO users (Email, Provider, First_name, Last_name, Password, Subscription_plan, Subscription_source, subscription_duration, AdminSubscriptionFlag, PreventAutoSubScriptionVerfify, Tester, AllDetails) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [Email, Provider, First_name, Last_name, Password, Subscription_plan, Subscription_source, subscription_duration, AdminSubscriptionFlag, PreventAutoSubScriptionVerfify, Tester, AllDetails]
    );
    res.status(200).json({ status: 'Successfully added to the user schema', newUser: result.rows[0] });
  } catch (err) {
    console.error('Error in POST request:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Update user
router.put('/:_id', async (req, res) => {
  const { _id } = req.params;
  const changes = req.body;

  try {
    const result = await client.query(
      'UPDATE users SET Email = $1, Provider = $2, First_name = $3, Last_name = $4, Password = $5, Subscription_plan = $6, Subscription_source = $7, subscription_duration = $8, AdminSubscriptionFlag = $9, PreventAutoSubScriptionVerfify = $10, Tester = $11, AllDetails = $12 WHERE id = $13 RETURNING *',
      [changes.Email, changes.Provider, changes.First_name, changes.Last_name, changes.Password, changes.Subscription_plan, changes.Subscription_source, changes.subscription_duration, changes.AdminSubscriptionFlag, changes.PreventAutoSubScriptionVerfify, changes.Tester, changes.AllDetails, _id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ status: 'User not found' });
    }
    res.status(200).json({ status: 'User updated successfully', updatedUser: result.rows[0] });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ status: 'Success' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
