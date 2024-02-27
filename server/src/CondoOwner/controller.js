const pool = require('../../db');
const queries = require('./queries')



const getCondoOwners = (req, res) => {
    console.log('get all users')
    pool.query(queries.getCondoOwners, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getCondoOwnerById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getCondoOwnerById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const addCondoOwner = (req,res) => {
    const {email} = req.body;
    pool.query(queries.checkIfEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email Already Exists");
        }
        pool.query(queries.addCondoOwner, [email], (error, result) => {
            if(error) throw error;
            res.status(201).send("User Created Successfully!");
        });
        pool.query(queries.updateRole, [email], (error, result) => {
            if(error) throw error;
            res.status(201).send("User Role Updated Successfully!");
        });
    })
}

module.exports = {
    getCondoOwners,
    getCondoOwnerById,
    addCondoOwner
};