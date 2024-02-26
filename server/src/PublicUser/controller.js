const pool = require('../../db');
const queries = require('./queries')
const {getCondoOwners} = require("../CondoOwner/controller");

const getPublicUsers = (req, res) => {
    console.log('get all Public Users')
    pool.query(queries.getPublicUsers, (error, results) => {
        if(error) throw error;
        console.log('before')
        console.log(results.rows);
        console.log('after')
        res.status(200).json(results.rows);
    });
}

const getPublicUserById = (req, res) => {
    console.log('get a specific Public User')
    const id = parseInt(req.params.id)
    pool.query(queries.getPublicUserById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const addPublicUser = (req,res) => {
    console.log('add a Public User')
    const {first_name, last_name, email, password, profile_picture} = req.body;
    pool.query(queries.checkIfEmailExists, [email], (error, results) =>  {
        if(results.rows.length){
            res.send("Email Already Exists");
        } else {
          pool.query(queries.addPublicUser, [first_name, last_name, email, password, profile_picture], (error, result) => {
              if(error) throw error;
              res.status(201).send("Public User Created Successfully!");
          }
        }); 
    })
}

module.exports = {
  getPublicUsers,
  getPublicUserById,
  addPublicUser,
};
