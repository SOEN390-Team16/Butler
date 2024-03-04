const pool = require('../../db');
const queries = require('./queries')
const {getCondoOwners} = require("../CondoOwner/controller");

// This generates two random alphanumeric strings of length 10 and concatenates them to create a key of length 20
function generateRandomKey() {
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

const generateRegistrationKey = (req, res) => {
    console.log('Generating Unique Registration Key');
    const {email, role} = req.body;
    console.log(req.body);
    const registration_key = generateRandomKey();
    pool.query(queries.checkIfRegistrationKeyAlreadyExists, [registration_key], (error, results) => {
        if (error) {
            console.error('Error checking if registration key already exists', error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
        if (results.rows.length !== 0){
            res.status(404).send('Registration Key Already Exists');
        }
        else {
            pool.query(queries.generateRegistrationKey, [registration_key, email, role], (error, result) => {
                if (error) {
                    console.error('Error assigning new registration key', error);
                    return res.status(500).json({error: 'Internal Server Error'});
                }
                res.status(201).send('new registration key assigned to user');
            })
        }
    })
};

const getRegistrationKeyByEmail = (req, res) => {
    console.log('Getting Registration Key By Email');
    const email = req.params.email;
    console.log(req.params.email);
    pool.query(queries.getRegistrationKeyByEmail, [email], (error, results) => {
        if (error) {
            console.error('Error getting registration key:', error);
            return res.status(500).json({ error: 'Internal Sever Error'});
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Registration Key Not Found' });
        }
        else {
            res.status(200).json(results.rows);
        }
    });
}

module.exports = {
    generateRegistrationKey,
    getRegistrationKeyByEmail
}