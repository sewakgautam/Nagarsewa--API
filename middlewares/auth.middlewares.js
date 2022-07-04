import { client } from "../config/database.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const loginMiddlewares = (req, res, next) => {
  let { email, password } = req.body;
  client.query(`Select * from users where email='${email}'`).then((resp) => {
    if (resp.rows.length == 0) {
      res.send({ message: `${email} doesnot exist` });
    } else if (
      resp.rows[0].email == email &&
      argon2.verify(resp.rows[0].password, password)
    ) {
      if (resp.rows[0].roles == "admin") {
        req.user = resp.rows[0];
        next();
      } else {
        console.log("err");
        client
          .query("select * from staffs")
          .then((result) => {
            let userID = resp.rows[0];
            let user_wada = result.rows[0];
            let final = { userID, user_wada };
            req.user = final;
            next();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      res.send({
        message: "Username or password not matched",
      });
    }
  });
};
export const registerMiddlewares = (req, res, next) => {
  let { email } = req.body;
  client
    .query(`select * from users where email='${email}';`)
    .then((reasult) => {
      if (reasult.rowCount == 0) {
        next();
      } else {
        res.send({
          message: "this user already exist",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};
export const checkAdmin = (req, res, next) => {
  let userData = req.access;
  if (userData.roles == "admin" || userData.roles == "superadmin") {
    console.log("Admin confirmed");
    next();
  } else {
    res.status(401).send({
      message: "unauthorized access",
    });
  }
};

export const activeSession = (req, res, next) => {
  try {
    let access_token = req.headers.token;
    const verification = jwt.verify(access_token, process.env.JWT_SECRET);
    console.log("token verified");
    req.access = verification.payload;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).send({
        message: "Token Expired",
      });
    } else if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).send({
        message: "Token Invalid",
      });
    } else {
      res.send({
        message: "khai k ko error ho malai ne tha xna ",
        error: `${err}`,
      });
    }
  }
};
