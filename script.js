import { client } from "./config/database.js";
import {config} from "dotenv";
import {v4} from "uuid";
import argon2 from "argon2";
config();

let data = process.env;
let pass = await argon2.hash(data.ADMIN_PASSWORD)

client.query(`Insert into users values ('${v4()}','${data.ADMIN_EMAIL}','${data.ADMIN_FULLNAME}','${pass}','${data.ADMIN_ROLES}')`)
.then(response=>{
    console.log(`Admin created with the email=${data.ADMIN_EMAIL} and password=${data.ADMIN_PASSWORD}`)
}).catch(err=>{
    console.log(`Error to create admin check the script.js file and .env file`)

})