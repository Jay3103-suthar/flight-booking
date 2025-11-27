import Admin from "../Models/Adminmodel.js";

export const getAllAdmins = async (req, res) => {
  try {
    // Exclude the password field
    const admins = await Admin.find({}).select('-password');
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get a single admin by ID
// @route   GET /api/admins/:id
// @access  Private/Admin
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateAdmin = async (req, res) => {
  try {
    // Prevent role or password changes via this simple update route
    const { name, email } = req.body;
    
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin profile updated", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin user deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
