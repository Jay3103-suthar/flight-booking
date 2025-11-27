import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // selected user
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    password: "", // <-- added password field
  });

  const token = localStorage.getItem("token");

  // ================================
  // Fetch All Users
  // ================================
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  // ================================
  // Open Update Modal
  // ================================
  const openEditModal = (user) => {
    setEditingUser(user._id);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      password: "", // clear password field by default
    });
  };

  // ================================
  // Update User
  // ================================
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Only include password if entered
    const updateData = { ...formData };
    if (!formData.password) {
      delete updateData.password;
    }

    try {
      await axios.put(
        `http://localhost:8000/api/users/${editingUser}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("User updated successfully!");
      setEditingUser(null);
      fetchUsers(); // refresh list
    } catch (err) {
      console.log(err);
      alert("Failed to update user");
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">👤 User Management</h2>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="text-center">
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.phone}</td>
                <td className="border p-2 capitalize">{u.role}</td>

                <td className="border p-2">
                  <button
                    onClick={() => openEditModal(u)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ======================================
          UPDATE MODAL
        ====================================== */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Update User</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-gray-600 mb-1 block">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-600 mb-1 block">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-gray-600 mb-1 block">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-gray-600 mb-1 block">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-600 mb-1 block">
                  Password (optional)
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg focus:ring-2"
                  placeholder="Enter new password if you want to change"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserManagement;
