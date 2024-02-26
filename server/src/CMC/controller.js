const pool = require('../../db');
const queries = require('./queries')

const getCMCs = (req, res) => {
    console.log('get all Condo Management Companies')
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
    const {company_name, email, password} = req.body;
    pool.query(queries.checkIfEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email Already Exists");
        }
        pool.query(queries.addCMC, [company_name, email, password], (error, result) => {
            if(error) throw error;
            res.status(201).send("Condo Management Company Created Successfully!");
            
        }); 
    })
}

module.exports = {
    getCMCs,
    getCMCById,
    addCMC
};