import jwt from "jsonwebtoken";
// this middleware is used to authenticate the user by verifying the token in the cookie of the request header

const authenticate = async (req, res, next) => {
  // need cookie-parser module to parse the cookies
  console.log(req.cookies);
  // Get server side the token from the cookie of the request header
  const token = req.cookies.token;

  if (!token) {
    throw new Error("Not Authenticated", {
      cause: 401
    });
  }

  try {
    // verify the token and return the payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log("payload", payload);
    //
    req.user = { _id: payload.id, role };
    next();
  } catch (error) {
    throw new Error("Invalid token", {
      cause: 401
    });
  }
};

export default authenticate;
