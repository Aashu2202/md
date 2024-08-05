const express = require('express');
const { adminLogin } = require('../../controller/admin/adminController');
const { authenticateToken, authorizeRoles } = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/admin/login', adminLogin);
router.get('/admin/', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.send('This is a protected route accessible only by admins');
});

module.exports = router;