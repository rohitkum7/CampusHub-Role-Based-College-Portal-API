import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const protect = async (req, res, next) => {
  //Getting the token and check if it there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt && req.cookies.jwt !== "loggedout") {
    token = req.cookies.jwt;
  }
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in!! Please login to get access",
    });
  }

  //2) Verification Token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const userData = await db.user.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  req.user = userData;
  next();
};
