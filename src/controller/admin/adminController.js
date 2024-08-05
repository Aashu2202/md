const bcrypt = require('bcryptjs');
const { signToken } = require('../../utils/jwtUtils');
const { admin } = require("../../models/admin/adminModel")

const {deleteUserById}= require("../../utils/DeleteAllData");
const {getAllDetails} = require("../../utils/GetAllData");
const {getDetailbyId} = require("../../utils/getById")
const adminRegister = async (req, res) => {
  const { email, password, role } = req.body;
  const date = new Date()

  if (role !== 'admin') {
    return res.status(400).send('Invalid role');
  }
  console.log(req);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = await admin.create({
    email,
    password: hashedPassword,
    role,
  })
  res.status(201).json({ staus: "Admin Registered Successfully" });
}

const adminLogin = async (req, res) => {
  const { email, password, role } = req.body;
  const adminUser = await admin.findOne({
    email: email
  })
  console.log(adminUser.role);
  if (adminUser && await bcrypt.compare(password, adminUser.password)) {
    const token = signToken({ email, role: adminUser.role });
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 3600000 });
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).send('Invalid credentials');
  }
};

const getAllAdmin = async (req, res) => {
  await getAllDetails(req, res, admin);
}

const deleteAdminById = async (req, res) => {
  const deletedUserStatus = await deleteUserById(admin, req.params.id);
  if (!deletedUserStatus) {
    return res.status(404).json({ error: "Admin Data not found" });
  }
  return res.json({ status: "Success" });
}
const updateAdminById = async (req, res) => {
  try {
    const changes = req.body;
    const updatedUser = await admin.findByIdAndUpdate(req.params.id, changes, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ status: "Admin not found" });
    }
    return res.status(200).json({ status: "Admin Data updated successfully", updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ error: "Error updating Admin" });
  }
}
const getAdminById = async (req, res) => {
  await getDetailbyId(req, res, admin);
}


module.exports = { adminRegister, adminLogin, getAllAdmin, deleteAdminById, updateAdminById, getAdminById };