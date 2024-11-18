import JWT from "jsonwebtoken";

export const userAuthentication = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    next("Authentication Failed!");
    return;
  }

  try {
    const token = authHeader?.split("Bearer ")[1];
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    next("Authentication Failed!");
  }
};
