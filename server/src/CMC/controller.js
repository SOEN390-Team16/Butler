const { error } = require('console');
const pool = require('../../db');
const queries = require('./queries')


const getCMCs = (req, res) => {
    console.log('get all cmc users')
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
    console.log("adding user")
    const {first_name, last_name, email, password, role} = req.body;
    pool.query(queries.checkIfEmailExists, [email], (error, results) => {
        console.log(results.rows.length)
        if(results.rows.length){
            res.send("Email Already Exists");
        }
        pool.query(queries.addCMC, [first_name, last_name, email, password, role], (error, result) => {
            if(error) throw error;
            res.status(201).send("CMC User Created Successfully!");
            
        }); 
    })
}

const updateCMC = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, email, age, dob} = req.body;
    pool.query(queries.getCMCById, [id], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("CMC user does not exist.")
        }
        pool.query(queries.updateCMC, [name, id], (error, results) => {

        })
    })
}

const removeCMC = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getCMCById, [id], (error,results) =>{
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("CMC user does not exist.")
        }
        pool.query(queries.removeCMC, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send("CMC user removed successfully.")
        })
    }) 
}
module.exports = {
    getCMCs,
    getCMCById,
    addCMC,
    removeCMC,
    updateCMC
};