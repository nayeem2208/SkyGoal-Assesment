import jwt from "jsonwebtoken";
import usermodel from "../modals/userModal.js";

const authcheck =  async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      // Remove the "Bearer " prefix from the token (if present)
      const tokenWithoutBearer = token.replace("Bearer ", "");

      // Verify the token
      const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

      // Fetch user details and attach to the request
      
      req.user = await usermodel.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Unauthorized" }); // Send an error response
    }
  } else {
    res.status(401).json({ error: "Unauthorized" }); // Send an error response
  }
};

export default authcheck;