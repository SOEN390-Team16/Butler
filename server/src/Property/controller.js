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
    console.log('get a specific Property')
    const property_id = parseInt(req.params.property_id)
    pool.query(queries.getPropertyById, [property_id], (error, results) => {
        if (error) {
            console.error('Error updating user:', error);
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
        }
    })

    /* Create the property */
    pool.query(
        queries.addProperty,
        [companyid, property_name, unit_count, parking_count, locker_count, address],
        (error, result) => {
            if(error) throw error;
            console.log(result)
            res.status(201).json(result.rows.at(0));
    });
};

const updateProperty = (req, res) => {
    const propertyid = req.params.propertyid;
    const { companyid, propety_name, unit_count, parking_count, locker_count, adress } = req.body;

    if (!companyid && !propety_name && !unit_count && !parking_count && !locker_count && !adress === undefined) {
        return res.status(400).json({ error: 'At least one field is required for updating' });
    }

    const setClauses = [];
    const values = [];

    if (companyid) {
        setClauses.push('companyid = $' + (values.length + 1));
        values.push(companyid);
    }
    if (propety_name) {
        setClauses.push('propety_name = $' + (values.length + 1));
        values.push(propety_name);
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
    if (adress) {
        setClauses.push('adress = $' + (values.length + 1));
        values.push(adress);
    }

    const query = `UPDATE property SET ${setClauses.join(', ')} WHERE companyid = $${values.length + 1}`;

    pool.query(queries.getPropertyById, [propertyid], (error, results) => {
        if (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Public User not found' });
        } else {
            pool.query(query, [...values, propertyid], (error, result) => {
                if (error) {
                    console.error('Error updating public user:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if (result.rowCount === 0) {
                    return res.status(404).json({ error: 'Public User not found' });
                }

                res.status(200).json({ message: 'Public User updated successfully' });
            });
        }
    });
};

const removeProperty = (req, res) => {
    const propertyid = parseInt(req.params.propertyid)
    pool.query(queries.getPropertyById, [propertyid], (error,result) =>{
        if(error){
            console.error('Error finding property:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        pool.query(queries.removeProperty, [propertyid], (error, results) => {
            if(error){
                console.error('Error removing user:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(200).send("user removed successfully.")
        })
    })
}

module.exports = {
    getProperties,
    getPropertyById,
    addProperty,
    updateProperty,
    removeProperty
};