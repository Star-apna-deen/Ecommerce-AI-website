import jwt from "jsonwebtoken";

//token ko varify kerna h token kis user ka h
const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "User does't have a token" });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(400).json({ message: "User does't have valid token" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    console.log(`isAuth error ${error}`);
    return res.status(500).json({ message: `isAuth error ${error}` });
  }
};

export default isAuth;
