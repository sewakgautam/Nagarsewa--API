import { client as db } from "../config/database.js";
import { v4 } from "uuid";

export const dashboard = (req, res) => {
  let token = req.access;
  db.query(`select * from nagarpalika`).then((response) => {
    res.send(response);
  });
};


export const allWada = (req, res) => {
  let query = "select * from wada; select * from nagarpalika";
  db.query(query)
    .then((response) => {
      res.send(response.map((obj) => obj.rows));
    })
    .catch((err) => {
      res.send(err);
    });
};


export const allnagarpalika = (req, res) => {
  db.query("select * from nagarpalika")
    .then((reqponse) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
};

export const addNagar = (req, res) => {
  let { name, address, pradesh } = req.body;
  let logo = `./${req.file.path}`;
  db.query(
    `insert into nagarpalika values('${v4()}','${name}','${address}','${pradesh}','${logo}')`
  ).then((resp) => {
    res.send({
      DATA: `${name} Nagarpalika added on database`,
    });
  }).catch(err=>{
    if (err && err.code == 23505){
      res.send(`${name} nagarpalika already exist`)
    }
    res.send(err)
  })
};
export const addWada = (req, res) => {
  let { wada_number, address, contact_info, nagar_id } = req.body;
  db.query(`select nagar_id from wada where wada_number='${wada_number}'`)
  .then(resp=>{
    let nagar = resp.rows.map(obj=> obj.nagar_id)
    if(nagar.includes(nagar_id)){
      res.send({
        "resp":"Wada already exist on that nagarpalika"
      })
    }else{
      db.query(
        `insert into wada values('${v4()}','${wada_number}','${address}','${contact_info}','${nagar_id}')`
      );
      res.send({
        DATA: `wadaNumber:${wada_number} added under nagarpalika_id:${nagar_id} `,
      });
    }
  }).catch(err=>{
    console.log(err)
  })
  
};
export const addCategory = (req, res) => {
  let {title,wada_id} = req.body;
  let featureImage =  `./${req.file.path}`;
  db.query(`insert into categories values('${v4()}','${title}','${featureImage}','${wada_id}')`)
  .then(resp=>{
    res.send({
      message: `${title} Category added`,
    });
  }).catch(err=>{
    console.log(err)
    res.status(500).send({
      message:"err"
    })
  })
  
};
export const addSubcategory = (req, res) => {
  let {title,categories_id} = req.body;
  db.query(`insert into subcategories values('${v4()}','${title}','${categories_id}')`)
  .then(resp=>{
    res.send({
      message: `${title} subCategory added`,
    });
  }).catch(err=>{
    console.log(err)
    res.status(500).send({
      message:"err"
    })
  })
};
export const addProduct = (req, res) => {
  let {title,description,subcategories} = req.body;
  let featureimage =  `./${req.file.path}`;
  db.query(`insert into products values('${v4()}','${title}','${featureimage}','${description}','${subcategories}')`)
  .then(resp=>{
    res.send({
      message: `${title} product added`,
    });
  }).catch(err=>{
    console.log(err)
    res.status(500).send({
      message:"err"
    })
  })
};

export const designation = (req,res)=>{
  let {fullname,contact,orders,wada_id} = req.body;
  let avatar = `./${req.file.path}`;
  db.query(`insert into designation values('${v4()}','${fullname}','${avatar}','${contact}','${orders}','${wada_id}')`)
  .then(resp=>{
    res.send({
      message: `${fullname} product added`,
    });
  }).catch(err=>{
    console.log(err)
    res.status(500).send({
      message:"err"
    })
  })
}