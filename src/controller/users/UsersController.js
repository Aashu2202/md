const express = require('express');
const { check, validationResult } = require('express-validator');
const client = require("../../db");


// Get all users with pagination
async function handleGetAllUsers(req, res) {
    
  const { limit = 10, offset = 0 } = req.query;

  // Ensure limit and offset are valid numbers
  if (isNaN(limit) || isNaN(offset)) {
    return res.status(400).json({ error: 'Invalid limit or offset' });
  }

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
}


// Create user
async function handleCreateUser(req, res) {
const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        provider,
        uid,
        encrypted_password,
        reset_password_token,
        reset_password_sent_at,
        allow_password_change,
        remember_created_at,
        sign_in_count,
        current_sign_in_at,
        last_sign_in_at,
        current_sign_in_ip,
        last_sign_in_ip,
        confirmation_token,
        confirmed_at,
        confirmation_sent_at,
        unconfirmed_email,
        image,
        email,
        tokens,
        first_name,
        last_name,
        avatar,
        subscription_plan,
        subscription_plan_verified_at,
        prevent_automatic_subscription_verification,
        company_id,
        stripe_id,
        country,
        language,
        session_feedback_enabled,
        language_set_by_user,
        temporary_user_upgraded_at,
        subscription_duration,
        subscription_source,
        gender,
        signup_source,
        tester,
        mood,
        subscription_token,
        paypal_id,
        mark_for_deletion,
        admin_subscription_flag,
        has_been_on_7d_trial,
        web_signup_source,
        web_subscription_source,
        onboarded,
        general_notifications_enabled,
        current_app_version,
        subscription_manually_upgraded_at,
        server_generated_password,
        onboarded_through_funnel,
        onboarded_at,
        uuid,
        token,
        aok_user,
        accepted_terms_and_conditions,
        acceptance_date,
        upgraded_subscription_plan,
        hubspot_contact_notes,
        trial_started_at,
        took_trial,
        web_signup_channel,
        mailer_signup
    } = req.body;

    // Get the current timestamp for created_at and updated_at
    const createdAt = new Date();
    const updatedAt = new Date();

    try {
        const result = await client.query(
            `INSERT INTO users (
                provider, uid, encrypted_password, reset_password_token, reset_password_sent_at,
                allow_password_change, remember_created_at, sign_in_count, current_sign_in_at, last_sign_in_at,
                current_sign_in_ip, last_sign_in_ip, confirmation_token, confirmed_at, confirmation_sent_at,
                unconfirmed_email, image, email, tokens, first_name, last_name, avatar, subscription_plan,
                subscription_plan_verified_at, prevent_automatic_subscription_verification, company_id, stripe_id,
                country, language, session_feedback_enabled, language_set_by_user, temporary_user_upgraded_at,
                subscription_duration, subscription_source, gender, signup_source, tester, mood, subscription_token,
                paypal_id, mark_for_deletion, admin_subscription_flag, has_been_on_7d_trial, web_signup_source,
                web_subscription_source, onboarded, general_notifications_enabled, current_app_version,
                subscription_manually_upgraded_at, server_generated_password, onboarded_through_funnel, onboarded_at,
                uuid, token, aok_user, accepted_terms_and_conditions, acceptance_date, upgraded_subscription_plan,
                hubspot_contact_notes, trial_started_at, took_trial, web_signup_channel, mailer_signup,
                created_at, updated_at
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
                $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38,
                $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56,
                $57, $58, $59, $60, $61, $62, $63, $64, $65
            ) RETURNING *`,
            [
                provider, uid, encrypted_password, reset_password_token, reset_password_sent_at,
                allow_password_change, remember_created_at, sign_in_count, current_sign_in_at, last_sign_in_at,
                current_sign_in_ip, last_sign_in_ip, confirmation_token, confirmed_at, confirmation_sent_at,
                unconfirmed_email, image, email, tokens, first_name, last_name, avatar, subscription_plan,
                subscription_plan_verified_at, prevent_automatic_subscription_verification, company_id, stripe_id,
                country, language, session_feedback_enabled, language_set_by_user, temporary_user_upgraded_at,
                subscription_duration, subscription_source, gender, signup_source, tester, mood, subscription_token,
                paypal_id, mark_for_deletion, admin_subscription_flag, has_been_on_7d_trial, web_signup_source,
                web_subscription_source, onboarded, general_notifications_enabled, current_app_version,
                subscription_manually_upgraded_at, server_generated_password, onboarded_through_funnel, onboarded_at,
                uuid, token, aok_user, accepted_terms_and_conditions, acceptance_date, upgraded_subscription_plan,
                hubspot_contact_notes, trial_started_at, took_trial, web_signup_channel, mailer_signup,
                createdAt, updatedAt // Include created_at and updated_at
            ]
        );

        res.status(201).json({ status: 'Successfully added to the user schema', newUser: result.rows[0] });
    } catch (err) {
        console.error('Error in POST request:', err);
        res.status(500).json({ error: 'Something went wrong' });
}
}
      
// Update user
async function handleUpdateUserById(req, res) {
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
}

// Delete user
async function handleDeleteUserById(req, res) {
    
  const { id } = req.params;

  try {
    const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ status: 'Success' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Error deleting user' });
  }
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById
};
