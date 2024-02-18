const pool = require('../../db');
const queries = require('./queries')

const getCMCs = (req, res) => {
    console.log('get all users')
    pool.query(queries.getCMCs, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getCMCById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getCMCById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const addCMC = (req,res) => {
    const {name, email, age, dob} = req.body;
    pool.query(queries.checkIfEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email Already Exists");
        }
        pool.query(queries.addCMC, [name, email, age, dob0], (error, result) => {
            if(error) throw error;
            res.status(201).send("User Created Successfully!");
            
        }); 
    })
}

module.exports = {
    getCMCs,
    getCMCById,
    addCMC
};