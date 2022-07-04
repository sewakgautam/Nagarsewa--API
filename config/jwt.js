import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
export const createToken = (payload) => {
  const sessionToken = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "5hr",
  });
  return sessionToken;
};
