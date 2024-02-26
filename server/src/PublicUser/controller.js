const pool = require('../../db');
const queries = require('./queries')

const getPublicUsers = (req, res) => {
    console.log('get all user')
    pool.query(queries.getPublicUsers, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getPublicUserById = (req, res) => {
    console.log('get a specific user')
    const userid = parseInt(req.params.userid)
    console.log(userid)
    pool.query(queries.getPublicUserById, [userid], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const addPublicUser = (req, res) => {
    console.log("adding public user");
    const { first_name, last_name, email, password, role, profile_picture } = req.body;

    pool.query(queries.checkIfEmailExists, [email], (error, results) => {
        if (error) {
            console.error("Error checking if email exists:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (!results || !results.rows) {
            console.error("Results object is undefined or has no 'rows' property:", results);
            return res.status(500).json({ error: "Unexpected Server Response" });
        }

        if (results.rows.length) {
            return res.status(400).json({ error: "Email Already Exists" });
        }

        pool.query(queries.addPublicUser, [first_name, last_name, email, password, role, profile_picture], (error, result) => {
            if (error) {
                console.error("Error adding public user:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            return res.status(201).json({ message: "Public User Created Successfully!" });
        });
    });
};


const updatePublicUser = (req, res) => {
    const userid = req.params.userid;
    const { first_name, last_name, email, password, role, profile_picture } = req.body;

    // Check if at least one field is provided for updating
    if (!first_name && !last_name && !email && !password && !role && profile_picture === undefined) {
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
    if (role) {
        setClauses.push('role = $' + (values.length + 1));
        values.push(role);
    }
    if (profile_picture !== undefined) {
        setClauses.push('profile_picture = $' + (values.length + 1));
        values.push(profile_picture);
    }

    const query = `UPDATE public_user SET ${setClauses.join(', ')} WHERE userid = $${values.length + 1}`;

    pool.query(query, [...values, userid], (error, result) => {
        if (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    });
};

const removePublicUser = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getPublicUserById, [userid], (error,results) =>{
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("user does not exist.")
        }
        pool.query(queries.removePublicUser, [userid], (error, results) => {
            if(error) throw error;
            res.status(200).send("user removed successfully.")
        })
    }) 
}

module.exports = {
    getPublicUsers,
    getPublicUserById,
    addPublicUser,
    removePublicUser,
    updatePublicUser
};