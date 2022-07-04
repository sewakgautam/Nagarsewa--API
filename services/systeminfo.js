import request from "request";
import { config } from "dotenv";
import { client as db } from "../config/database.js";
config();

const checkWeather = (req, res) => {
    // let {location} = req.params;
    let location = "nepal";
    let a  = request(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}&aqi=yes`, (error, response, body) =>{
        if (!error){
            let returnData = JSON.parse(body);
            let wetherCondition = returnData.current.condition.text;
            return a = wetherCondition;
        }else{
            console.log(error)
        }
  });
  return a
};



export const systemInfo = (req,res)=>{

    db.query('select * from nagarpalika')
    .then(response=>{
        db.query('select * from wada')
        .then(resp=>{
            // let a = resp.rows[0].address
            console.log(resp)
        }).catch(err=>{
            console.log(err)
        })
        console.log("this is nagar details, ",response)
    }).catch(err=>{
        console.log(err)
    })
}