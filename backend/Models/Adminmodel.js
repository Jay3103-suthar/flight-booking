import mongoose from "mongoose";

// Note: In a true RBAC system, this model is usually merged into the User model.
// We create it separately here as requested.
const AdminSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Admin name is required.'] 
  },
  email: { 
    type: String, 
    required: [true, 'Admin email is required.'], 
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'] 
  },
  password: { 
    type: String, 
    required: [true, 'Password is required.'], 
    select: false // Do not return password by default
  },
  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
    immutable: true // Role cannot be changed
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
