const pool = require('../../db');
const queries = require('./queries')
const {getCondoOwners} = require("../CondoOwner/controller");

// This generates two random alphanumeric strings of length 10 and concatenates them to create a key of length 20
function generateRandomKey() {
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

const generateAndAssignNewRegistrationKey = (req, res) => {
    console.log('Generating Unique Registration Key');
    const {condoID, email, role} = req.body;
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
            pool.query(queries.assignNewRegistrationKey, [registration_key, condoID, email], (error, result) => {
                if (error) {
                    console.error('Error assigning new registration key', error);
                    return res.status(500).json({error: 'Internal Server Error'});
                }
                pool.query(queries.updatePublicUserRole, [role, email], (error, result) => {
                    if (error) {
                        console.error('Error updating user role', error);
                        return res.status(500).json({error: 'Internal Server Error'});
                    }
                })
                res.status(201).send('new registration key assigned and user role updated');
            })
        }
    })
};


module.exports = {
    generateAndAssignNewRegistrationKey,
}