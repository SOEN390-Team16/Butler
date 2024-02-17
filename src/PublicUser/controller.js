const pool = require('../../db');
const queries = require('./queries')

const getPublicUsers = (req, res) => {
    console.log('get all students')
    pool.query(queries.getPublicUsers, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getPublicUserById = (req, res) => {
    console.log('get a specific student')
    const id = parseInt(req.params.id)
    pool.query(queries.getPublicUserById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const addPublicUser = (req,res) => {
    console.log('add a student')
    const {name, email, age, dob} = req.body;
    pool.query(queries.checkIfEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email Already Exists");
        }
        pool.query(queries.addPublicUser, [name, email, age, dob], (error, result) => {
            if(error) throw error;
            res.status(201).send("Student Created Successfully!");
            
        }); 
    })
}

module.exports = {
    getPublicUsers,
    getPublicUserById,
    addPublicUser
};