import {client as database} from "../config/database.js";

export const homePage=(req,res)=>{
    database.query(`Select * from categories`)
    .then(response=>{
        res.send(response.rows)
    }).catch(err=>{
        res.send(err)
    })
}
export const subCategories=(req,res)=>{
    let {categories} = req.params;
    database.query(`select subcategories.title, products.title as productTitle, products.image from subcategories join products on subcategories._id = products.subcategories_id where subcategories.categories_id='${categories}';`)
    .then(response=>{
        res.send(response.rows)
    }).catch(err=>{
        res.send(err)
    })
}
export const product=(req,res)=>{
    let {subcategories,product_id} = req.params;
    console.log(product_id)
    database.query(`select products.title, products.description from products where subcategories_id='${subcategories}' and _id='${product_id}';`)
    .then(response=>{
        res.send(response.rows)
    }).catch(err=>{
        console.log(err)
        res.send(err)
    })
}