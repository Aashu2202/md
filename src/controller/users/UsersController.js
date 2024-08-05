const db = require('../../db');
const { check, validationResult } = require('express-validator');

// Get request method API
async function handleGetAllUsers(req, res) {
    try {
        const users = await db.any('SELECT * FROM users');
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

// Post method API
const validateUser = [
    check('Email').isEmail().withMessage('Invalid email address'),
    check('First_name').notEmpty().withMessage('First name is required'),
    check('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('Password_confirmation').custom((value, { req }) => value === req.body.Password).withMessage('Passwords do not match'),
    // Add more validations as needed
];

async function handleCreateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { Email, Provider, First_name, Last_name, Password, Subscription_plan, Subscription_source, subscription_duration, AdminSubscriptionFlag, PreventAutoSubScriptionVerfify, Tester, AllDetails } = req.body;

    try {
        const result = await db.one(
            `INSERT INTO users (email, provider, first_name, last_name, password, subscription_plan, subscription_source, subscription_duration, admin_subscription_flag, prevent_auto_subscription_verfify, tester, all_details) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [Email, Provider, First_name, Last_name, Password, Subscription_plan, Subscription_source, subscription_duration, AdminSubscriptionFlag, PreventAutoSubScriptionVerfify, Tester, AllDetails]
        );
        res.status(200).json({ status: "Successfully added to the user schema", user: result });
    } catch (err) {
        console.error("Error in POST request:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

// Update the user data
async function handleUpdateUserById(req, res) {
    const { id } = req.params;
    const { Email, Provider, First_name, Last_name, Password, Subscription_plan, Subscription_source, subscription_duration, AdminSubscriptionFlag, PreventAutoSubScriptionVerfify, Tester, AllDetails } = req.body;

    try {
        const result = await db.oneOrNone(
            `UPDATE users SET email = $1, provider = $2, first_name = $3, last_name = $4, password = $5, subscription_plan = $6, subscription_source = $7, subscription_duration = $8, admin_subscription_flag = $9, prevent_auto_subscription_verfify = $10, tester = $11, all_details = $12
            WHERE id = $13 RETURNING *`,
            [Email, Provider, First_name, Last_name, Password, Subscription_plan, Subscription_source, subscription_duration, AdminSubscriptionFlag, PreventAutoSubScriptionVerfify, Tester, AllDetails, id]
        );

        if (!result) {
            return res.status(404).json({ status: "User not found" });
        }
        res.status(200).json({ status: "User updated successfully", user: result });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Error updating user" });
    }
}

// Delete user
async function handleDeleteUserById(req, res) {
    const { id } = req.params;

    try {
        const result = await db.result('DELETE FROM users WHERE id = $1', id);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ status: "Success" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Error deleting user" });
    }
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById,
    validateUser
};
