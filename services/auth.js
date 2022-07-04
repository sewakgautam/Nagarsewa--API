import { createToken } from "../config/jwt.js";
import { client as db } from "../config/database.js";
import {v4} from "uuid";
import argon2 from "argon2";

export const login = (req,res)=>{
    if(req.user._id){
        res.send({
            accesstoken: createToken({
                sub:req.user._id,
                email:req.user.email,
                roles:req.user.roles
            })
        })

    }else{
    res.send({
        accesstoken: createToken({
            sub:req.user.userID._id,
            email:req.user.userID.email,
            roles:req.user.userID.roles,
            wada:req.user.user_wada.wada_id
        })
    })
}
}
export const addStaff = async (req,res)=>{
    let {name,email,password,roles} = req.body;
    let pass = await argon2.hash(password)
    db.query(`Insert into users values('${v4()}','${email}','${name}','${pass}','${roles}')`)
    .then(response=>{
        console.log(req.body.email, "data inserted")
        db.query(`select * from users where email='${req.body.email}'`)
        .then(dbresp=>{
            let user_id = dbresp.rows[0]._id
            db.query(`insert into staffs values('${user_id}','${req.body.wada}')`)
            .then(addresp=>{
                console.log("data inserted on staffs")
                res.send(addresp)            
            }).catch(err=>{
                res.send(err)
            })
        }).catch(err=>{
            res.send("err")
        })
    }).catch(err=>{
        console.log(err)
        res.send({
            message:"Khai k ko error ho"
        })
    })
}