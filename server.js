import express from "express";
import {config} from "dotenv";
import {homePage,subCategories,product} from './services/nagarData.js';
import {system as adminRoutes} from "./routes/admin.routes.js"
import {client as db} from './config/database.js';
import {createTable} from './config/createTable.js';
import {error404} from './services/error404.js'
import { systemInfo } from "./services/systeminfo.js";
import { activeSession, checkAdmin, loginMiddlewares } from "./middlewares/auth.middlewares.js";
import { login } from "./services/auth.js";

// import {loginMiddleware} from "./middlewares/login.middlewares.js";
// import {login} from "./services/login.js";
const app = express();
app.use(express.json());
config();
createTable();

db.connect((err)=>{
    if (!err) console.log("Db Connected");
    else console.log("Db error");
});



app.get("/",homePage)
app.post("/auth/login",loginMiddlewares,login)
app.get("/systeminfo",systemInfo)
app.use("/api/dashboard",activeSession ,adminRoutes)



app.get("/api/categories/:categories/",subCategories)
app.get("/api/subcategories/:subcategories/product/:product_id",product)
// app.use("/wadadetails")

app.use(error404)

app.listen(process.env.PORT,()=>{
    console.log(`Server started on port number ${process.env.PORT}`)
});