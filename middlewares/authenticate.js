import jwt from "jsonwebtoken";
import chalk from "chalk";
// this middleware is used to authenticate the user by verifying the token in the cookie of the request header

const authenticate = async (req, res, next) => {
  // need cookie-parser module to parse the cookies

  // Get server side the token from the cookie of the request header
  // const token = req.cookies.token;

  const { token } = req.cookies;

  console.log(chalk.bgRed("token:"), token);

  if (!token) {
    throw new Error("Not Authenticated", {
      cause: 401
    });
  }

  try {
    // verify the token and return the payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log("payload", payload);
    console.log("payload id", payload._id);

    console.log(chalk.bgRed("payload"), payload);

    req.user = { _id: payload._id, role: payload.role };
    next();
  } catch (error) {
    throw new Error("Invalid token", {
      cause: 401
    });
  }
};

export default authenticate;
