const pool = require('../../db');
const queries = require('./queries')

const getCondoOwners = (req, res) => {
    console.log('get all condo owners')
    pool.query(queries.getCondoOwners, (error, results) => {
        if (error) {
            console.error('Error finding condo owners:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Condo Owner Not Found' });
        }
        else{
            res.status(200).json(results.rows);
        }
    });
}

const getCondoOwnerById = (req, res) => {
    console.log('get condo owner by id')
    const ownerid = parseInt(req.params.ownerid)
    pool.query(queries.getCondoOwnerById, [ownerid], (error, results) => {
        if (error) {
            console.error('Error finding condo owner:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Condo Owner Not Found' });
        }
        res.status(200).json(results.rows);
    });
}

const addCondoOwner = (req,res) => {
    console.log('add a condo owner')
    const {email} = req.body;
    pool.query(queries.checkIfEmailExists, [email], (error, results) =>  {
        if (error) {
            console.error('Error checking email existence:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!results.rows.length) {
            res.status(400).json({ error: 'Email Doesn\'t Exists' });
        }
        else{
            pool.query(queries.checkIfUserAlreadyExists, [email], (error, results) =>{
                if(error){
                    console.log('Error checking if user already exists')
                }
                const isPublicUser = results.rows[0]['?column?'];
                if(isPublicUser){
                    res.status(400).json({ error: 'User already exists' });  
                }
                else{
                    pool.query(queries.addCondoOwner, [email], (error, result) => {
                        if (error) {
                            console.error('Error adding condo owner:', error);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }
                        res.status(201).send("Condo Owner Created Successfully!");
                    }); 
                    pool.query(queries.updateParent, (error, result) => {
                        if (error) {
                            console.error('Error updating parent table:', error);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }
                        console.log("Parent Table Updated Successfully!");
                    });
                }
            })
        }
    })
}

const updateCondoOwner = (req, res) => {
    console.log("updating condo owner");
    const ownerid = req.params.ownerid;
    const { first_name, last_name, email, password, profile_picture } = req.body;

    if (!first_name && !last_name && !email && !password  && profile_picture === undefined) {
        return res.status(400).json({ error: 'At least one field is required for updating' });
    }

    const setClauses = [];
    const values = [];

    if (first_name) {
        setClauses.push('first_name = $' + (values.length + 1));
        values.push(first_name);
    }
    if (last_name) {
        setClauses.push('last_name = $' + (values.length + 1));
        values.push(last_name);
    }
    if (email) {
        setClauses.push('email = $' + (values.length + 1));
        values.push(email);
    }
    if (password) {
        setClauses.push('password = $' + (values.length + 1));
        values.push(password);
    }
    if (profile_picture !== undefined) {
        setClauses.push('profile_picture = $' + (values.length + 1));
        values.push(profile_picture);
    }

    const setClause = setClauses.join(', ');

    const query = `UPDATE public_user SET ${setClauses} WHERE userid = (SELECT userid FROM condo_owner WHERE ownerid = $${values.length + 1})`;

    pool.query(queries.getCondoOwnerById, [ownerid], (error, results) => {
        if (error) {
            console.error('Error finding condo owner:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Ccondo owner Not Found' });
        }
        else{
            pool.query(query, [...values, ownerid], (error, result) => {
                if (error) {
                    console.error('Error updating condo owner:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                
                if (result.rowCount === 0) {
                    return res.status(404).json({ error: 'condo owner not found' });
                }
        
                res.status(200).json({ message: 'condo owner updated successfully' });
            });
        }
    })
}

const removeCondoOwner = (req, res) => {
    const ownerid = parseInt(req.params.ownerid)
    pool.query(queries.getCondoOwnerById, [ownerid], (error,result) =>{
        if(error){
            console.error('Error finding condo owner:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'condo owner not found' });
        }
        pool.query(queries.removeCondoOwner, [ownerid], (error, results) => {
            if(error){
                console.error('Error removing condo owner:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).send("condo owner removed successfully.")
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