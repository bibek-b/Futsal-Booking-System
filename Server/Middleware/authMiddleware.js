import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //saves decoded user data(like id) - so the next func can access it
    req.id = decoded.id;
    req.role = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

export default authMiddleware;
