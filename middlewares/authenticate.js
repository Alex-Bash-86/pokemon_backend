import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // payload enthält _id und role
    req.user = { _id: payload._id, role: payload.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticate;
