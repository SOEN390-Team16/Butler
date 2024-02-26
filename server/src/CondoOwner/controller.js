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
    const {name, email, age, dob} = req.body;
    pool.query(queries.checkIfEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email Already Exists");
        }
        pool.query(queries.addCondoOwner, [name, email, age, dob0], (error, result) => {
            if(error) throw error;
            res.status(201).send("User Created Successfully!");
            
        }); 
    })
}

const updateCondoOwner = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, email, age, dob} = req.body;
    pool.query(queries.getCondoOwnerById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("CondoOwner user does not exist.")
        }
        pool.query(queries.updateCondoOwner, [name, id], (error, results) => {

        })
    })
}

const removeCondoOwner = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getCondoOwnerById, [id], (error,results) =>{
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("CondoOwner user does not exist.")
        }
        pool.query(queries.removeCondoOwner, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send("CondoOwner user removed successfully.")
        })
    }) 
}

module.exports = {
    getCondoOwners,
    getCondoOwnerById,
    addCondoOwner,
    updateCondoOwner,
    removeCondoOwner
};