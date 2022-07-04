import { Router } from "express";
import {
  activeSession,
  registerMiddlewares,
  checkAdmin,
} from "../middlewares/auth.middlewares.js";
import { login, addStaff } from "../services/auth.js";
import {
  addNagar,
  addWada,
  addCategory,
  addSubcategory,
  addProduct,
  allWada,
  allnagarpalika,
  designation,
} from "../services/dashboard.js";
export const system = Router();
import { upload } from "../config/imageStorage.js";

// all get request under /dashboard routes
system.get("/", activeSession);
system.get("/wada", activeSession, allWada);
system.get("/nagarpalika", activeSession, allnagarpalika);

// all post request under /dashboard routes
system.post("/addnagarpalika", checkAdmin, upload.single("logo"), addNagar);
system.post("/addwada", checkAdmin, addWada);
system.post("/addstaff", checkAdmin, registerMiddlewares, addStaff);
system.post("/addcategory", upload.single("featureImage"), addCategory);
system.post("/addsubcategory", addSubcategory);
system.post("/addproduct", upload.single("featureImage"), addProduct);
system.post("/adddesignation",checkAdmin,upload.single("featureImage"),designation);
