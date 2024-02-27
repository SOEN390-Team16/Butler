const { error } = require('console');
const pool = require('../../db');
const queries = require('./queries')


const getCMCs = (req, res) => {
    console.log('get all Condo Management Companies')
    pool.query(queries.getCMCs, (error, results) => {
        if (error) {
            console.error('Error finding cmc users:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } 
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'CMC User Not Found' });
        }       
        res.status(200).json(results.rows);
    });
}

const getCMCById = (req, res) => {
    console.log('get cmc\'s by id')
    const companyID = parseInt(req.params.companyID)
    pool.query(queries.getCMCById, [companyID], (error, results) => {
        if (error) {
            console.error('Error finding cmc user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'CMC User Not Found' });
        }
        res.status(200).json(results.rows);
    });
}

const addCMC = (req,res) => {
    const {company_name, email, password} = req.body;
    pool.query(queries.checkIfEmailExists, [email], (error, results) => {
        console.log(results.rows.length)
        if(results.rows.length != 0){
            res.status(400).send("Email Already Exists");
        }
        else{
            pool.query(queries.addCMC, [company_name, email, password], (error, result) => {
                if(error) throw error;
                res.status(201).send("Condo Management Company Created Successfully!");
            });
        } 
    })
}

const updateCMC = (req, res) => {
    console.log("updating cmc user");
    const companyID = req.params.companyID;
    const { company_name, email, password } = req.body;

    if (!company_name && !email && !password  === undefined) {
        return res.status(400).json({ error: 'At least one field is required for updating' });
    }

    const setClauses = [];
    const values = [];

    if (company_name) {
        setClauses.push('company_name = $' + (values.length + 1));
        values.push(company_name);
    }
    if (email) {
        setClauses.push('email = $' + (values.length + 1));
        values.push(email);
    }
    if (password) {
        setClauses.push('password = $' + (values.length + 1));
        values.push(password);
    }

    const setClause = setClauses.join(', ');

    const query = `UPDATE condo_management_company SET ${setClauses} WHERE companyID = $${values.length + 1}`;

    pool.query(queries.getCMCById, [companyID], (error, results) => {
        if (error) {
            console.error('Error finding cmc user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'CMC User Not Found' });
        }

        pool.query(query, [...values, companyID], (error, result) => {
            if (error) {
                console.error('Error updating cmc user:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            
            if (result.rowCount === 0) {
                return res.status(404).json({ error: 'cmc user not found' });
            }
    
            res.status(200).json({ message: 'cmc user updated successfully' });
        });
    });
}

const removeCMC = (req, res) => {
    const companyID = parseInt(req.params.companyID)
    pool.query(queries.getCMCById, [companyID], (error,result) =>{
        if(error){
            console.error('Error finding cmc user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'cmc user not found' });
        }
        pool.query(queries.removeCMC, [companyID], (error, results) => {
            if(error){
                console.error('Error removing cmc user:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).send("cmc user removed successfully.")
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