const pool = require('../../db');
const queries = require('./queries')

const getCondoRenters = (req, res) => {
    console.log('Get All Condo Renters')
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
    const {name, email, age, dob} = req.body;
    pool.query(queries.checkIfEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email Already Exists");
        }
        pool.query(queries.addCondoRenter, [name, email, age, dob0], (error, result) => {
            if(error) throw error;
            res.status(201).send("Condo Renter Created Successfully!");
            
        }); 
    })
}

const updateCondoRenter = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, email, age, dob} = req.body;
    pool.query(queries.getCondoRenterById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("Condo Renter User Does Not Exist.")
        }
        pool.query(queries.updateCondoRenter, [name, id], (error, results) => {

        })
    })
}

const removeCondoRenter = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getCondoRenterById, [id], (error,results) =>{
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("Condo Renter User Does Not Exist.")
        }
        pool.query(queries.removeCondoRenter, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send("Condo Renter User Removed Successfully.")
        })
    }) 
}

module.exports = {
    getCondoRenters,
    getCondoRenterById,
    addCondoRenter,
    updateCondoRenter,
    removeCondoRenter
};