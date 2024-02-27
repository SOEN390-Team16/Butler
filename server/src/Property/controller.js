const pool = require('../../db');
const queries = require('./queries')

const getProperties = (req, res) => {
    console.log('get all Property Profiles')
    pool.query(queries.getProperties, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getPropertyById = (req, res) => {
    const id = parseInt(req.params.id)
    console.log('getting Property ' + id )
    pool.query(queries.getPropertyById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const addProperty = (req,res) => {
    console.log("Adding Property");
    const {
        propertyid, 
        companyid, 
        propety_name, 
        unit_count, 
        parking_count, 
        locker_count,
        adress
    } = req.body;
    pool.query(queries.checkIfCompanyExists, [email], (error, results) => {
        if (error) {
            console.error("Error checking if Company exists:", error);
            return res
              .status(500)
              .send("An error occurred while checking Company existence.");
        }
        if(results.rows.length){
            res.send("Company Already Exists");
        }
        else{
            pool.query(queries.addProperty, [company_name, email, password], (error, result) => {
                if(error) return res.json(error);
                res.status(201).send("Property Profile Created Successfully!");
            }); 
        }   
    })
}

module.exports = {
    getProperties,
    getPropertyById,
    addProperty
};