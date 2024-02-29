const pool = require('../../db');
const queries = require('./queries')

const getProperties = (req, res) => {
    console.log("Get All Properties");
    pool.query(queries.getProperties, (error, results) => {
        if (error) {
            console.error('Error finding properties:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results.rows);
        }
    });
  };

const getPropertyById = (req, res) => {
    console.log('Get a specific property profile')
    const property_id = parseInt(req.params.property_id)
    pool.query(queries.getPropertyById, [property_id], (error, results) => {
        if (error) {
            console.error('Error fetching property profile:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Property not found' });
        } else {
            res.status(200).json(results.rows.at(0));
        }
    });
}

const addProperty = (req,res) => {
    console.log('add a Property')
    const {companyid, property_name, unit_count, parking_count, locker_count, address} = req.body;

    /* We need to check whether the given company exists */
    pool.query(queries.checkIfCompanyExists, [companyid], (error, results) =>  {
        if(error){
            console.error('Error finding company:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if(results.rows.length === 0){
            return res.status(404).send("Company does not exist");
        } else {
            /* Create the property profile */
            pool.query(
              queries.addProperty,
              [companyid, property_name, unit_count, parking_count, locker_count, address],
              (error, result) => {
                if(error) {
                  throw error;
                }
                res.status(201).json(result.rows.at(0));
              });
        }
    })
};

const updateProperty = (req, res) => {
    const property_id = req.params.property_id;
    const { companyid, property_name, unit_count, parking_count, locker_count, address } = req.body;

    if (!companyid && !property_name && !unit_count && !parking_count && !locker_count && !address) {
        return res.status(400).json({ error: 'At least one field is required for updating' });
    }

    const setClauses = [];
    const values = [];

    if (companyid) {
        setClauses.push('companyid = $' + (values.length + 1));
        values.push(companyid);
    }
    if (property_name) {
        setClauses.push('property_name = $' + (values.length + 1));
        values.push(property_name);
    }
    if (unit_count) {
        setClauses.push('unit_count = $' + (values.length + 1));
        values.push(unit_count);
    }
    if (parking_count) {
        setClauses.push('parking_count = $' + (values.length + 1));
        values.push(parking_count);
    }
    if (locker_count) {
        setClauses.push('locker_count = $' + (values.length + 1));
        values.push(locker_count);
    }
    if (address) {
        setClauses.push('address = $' + (values.length + 1));
        values.push(address);
    }

    const query = `UPDATE property SET ${setClauses.join(', ')} WHERE property_id = $${values.length + 1} RETURNING *`;

    /* Check if the property exists before applying any changes to it */
    pool.query(queries.getPropertyById, [property_id], (error, results) => {
        if (error) {
          console.error('Error updating property profile:', error);
          return res.status(500).json({error: 'Internal Server Error'});
        } else if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Property profile not found' });
        } else {
          /* Update the property profile */
            pool.query(query, [...values, property_id], (error, result) => {
              if (error) {
                console.error('Error updating property profile:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
              }
              res.status(200).json(result.rows.at(0));
            });
        }
    });
};

const removeProperty = (req, res) => {
    const property_id = parseInt(req.params.property_id)
    pool.query(queries.removeProperty, [property_id], (error, results) => {
        if (error) {
          console.error('Error removing property profile:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).send("Property profile successfully removed.")
    })
}

module.exports = {
    getProperties,
    getPropertyById,
    addProperty,
    updateProperty,
    removeProperty
};