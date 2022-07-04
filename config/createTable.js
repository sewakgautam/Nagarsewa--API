import { client } from "./database.js";
export const createTable = () => {
  client
    .query(
      `CREATE TABLE IF NOT EXISTS users(_id varchar(255) primary key, email varchar(255) not null unique, Fullname varchar(255) not null, password varchar(255) not null, roles varchar(255));
      CREATE TABLE IF NOT EXISTS nagarpalika(_id varchar(255) primary key, name varchar(255) unique,address varchar(255),pradesh varchar(255),image varchar(255));
      CREATE TABLE IF NOT EXISTS wada(_id varchar(255) primary key,wada_number varchar(255), address varchar(255),contact_info varchar(255) ,nagar_id varchar(255),Foreign key(nagar_id) references nagarpalika(_id));
      CREATE TABLE IF NOT EXISTS staffs(user_id varchar(255), wada_id varchar(255) unique, foreign key(user_id) references users(_id), foreign key(wada_id) references wada(_id));
      CREATE TABLE IF NOT EXISTS categories(_id varchar(255) primary key, title varchar(255) not null unique, image varchar(255), wada_id varchar(255), Foreign key(wada_id) references wada(_id));
      CREATE TABLE IF NOT EXISTS subcategories(_id varchar(255) primary key, title varchar(255) unique, categories_id varchar(255), Foreign key(categories_id) references categories(_id));
      CREATE TABLE IF NOT EXISTS products(_id varchar(255) primary key, title varchar(255) unique,image varchar(255), description text, subcategories_id varchar(255), Foreign key(subcategories_id) references subcategories(_id));
      CREATE TABLE IF NOT EXISTS designation(_id varchar(255) primary key, fullname varchar(255) unique,image varchar(255), contact varchar(255), orders varchar(255), wada_id varchar(255), Foreign key(wada_id) references wada(_id));
      `
    )
    .then((reasult) => {
      console.log("table created");
    })
    .catch((err) => {
      console.log(`Error while creating database, full error \n ${err}`);
    });
};
