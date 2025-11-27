import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Must contain { id, email, role } from the login process
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// ADDED: Checks if the user's role (from the JWT payload) is 'admin'
export const isAdmin = (req, res, next) => {
  // Check if user object exists AND if the role is set to 'admin'
  if (req.user && req.user.role === "admin") {
    next(); // User is an admin, proceed
  } else {
    // Stop the request
    return res.status(403).json({ message: "Access denied. Admin role required." });
  }
};
