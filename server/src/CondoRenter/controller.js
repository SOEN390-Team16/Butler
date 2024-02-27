const pool = require('../../db');
const queries = require('./queries')

const getCondoRenters = (req, res) => {
    console.log('get all Condo Renters')
    pool.query(queries.getCondoRenters, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getCondoRenterById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getCondoRenterById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const addCondoRenter = (req,res) => {
    const {email} = req.body;
    pool.query(queries.checkIfEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email Already Exists");
        }
        pool.query(queries.addCondoRenter, [email], (error, result) => {
            if(error) throw error;
            res.status(201).send("Condo Renter Created Successfully!");
        });
        pool.query(queries.updateRole, [email], (error, result) => {
            if(error) throw error;
            res.status(201).send("User Role Updated Successfully!");
        });
    })
}


module.exports = {
    getCondoRenters,
    getCondoRenterById,
    addCondoRenter
};