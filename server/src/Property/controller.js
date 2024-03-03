const pool = require('../../db');
const queries = require('./queries');

// Get all properties
const getProperties = (req, res) => {
    console.log("Get All Properties");

    // Retrieve all properties from the database
    pool.query(queries.getProperties, (error, results) => {
        if (error) {
            // Handle error if querying properties fails
            console.error('Error finding properties:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Send the retrieved properties as a response
            res.status(200).json(results.rows);
        }
    });
};

// Get a specific property by its ID
const getPropertyById = (req, res) => {
    console.log('Get a specific property profile');

    // Extract property ID from request parameters
    const property_id = parseInt(req.params.property_id);

    // Query the database for the property with the given ID
    pool.query(queries.getPropertyById, [property_id], (error, results) => {
        if (error) {
            // Handle error if fetching property fails
            console.error('Error fetching property profile:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            // Return 404 error if property is not found
            return res.status(404).json({ error: 'Property not found' });
        } else {
            // Send the retrieved property as a response
            res.status(200).json(results.rows.at(0));
        }
    });
};

// Add a new property
const addProperty = (req, res) => {
    console.log('Add a Property');
    const { companyid, property_name, unit_count, parking_count, locker_count, address } = req.body;

    // Check if property name already exists
    pool.query(queries.checkIfPropertyNameExists, [property_name], (error, results) => {
        if (error) {
            // Handle error if checking property name existence fails
            console.error('Error checking property name existence:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount > 0) {
            // Return 400 error if property name already exists
            return res.status(400).json({ error: 'Property name already exists' });
        } else {
            // Check if the given company exists
            pool.query(queries.checkIfCompanyExists, [companyid], (error, results) => {
                if (error) {
                    // Handle error if finding company fails
                    console.error('Error finding company:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                } else if (results.rows.length === 0) {
                    // Return 404 error if company does not exist
                    return res.status(404).send("Company does not exist");
                } else {
                    // Create the property profile in the database
                    pool.query(
                        queries.addProperty,
                        [companyid, property_name, unit_count, parking_count, locker_count, address],
                        (error, result) => {
                            if (error) {
                                // Handle error if adding property fails
                                console.error('Error adding property:', error);
                                return res.status(500).json({ error: 'Internal Server Error' });
                            }
                            // Send success message as a response
                            res.status(200).json({ message: "Property profile successfully added." });
                        });
                }
            });
        }
    });
};

// Update an existing property
const updateProperty = (req, res) => {
    const property_id = req.params.property_id;
    const { property_name, unit_count, parking_count, locker_count, address } = req.body;

    // Check if at least one field is provided for updating
    if (!property_name && !unit_count && !parking_count && !locker_count && !address) {
        return res.status(400).json({ error: 'At least one field is required for updating' });
    }

    const setClauses = [];
    const values = [];

    // Construct update query based on provided fields
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

    const query = `UPDATE property SET ${setClauses.join(', ')} WHERE property_id = $${values.length + 1}`;

    // Check if the property exists before applying any changes to it
    pool.query(queries.getPropertyById, [property_id], (error, results) => {
        if (error) {
            // Handle error if fetching property fails
            console.error('Error updating property profile:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            // Return 404 error if property profile is not found
            return res.status(404).json({ error: 'Property profile not found' });
        } else {
            // Update the property profile in the database
            pool.query(query, [...values, property_id], (error, result) => {
                if (error) {
                    // Handle error if updating property fails
                    console.error('Error updating property profile:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                // Send success message as a response
                res.status(200).json({ message: "Property profile successfully updated" });
            });
        }
    });
};

// Remove a property
const removeProperty = (req, res) => {
    const property_id = parseInt(req.params.property_id);
    pool.query(queries.getPropertyById, [property_id], (error, results) => {
        if (error) {
            // Handle error if checking property existence fails
            console.error('Error checking property existence:', error);
            return res.status(500).json({ error: 'Internal Server Error' });

        } else if (results.rowCount === 0) {
            // Return 404 error if property is not found
            return res.status(404).json({ error: 'Property not found' });

        } else {
            // Remove the property profile from the database
            pool.query(queries.removeProperty, [property_id], (error, results) => {
                if (error) {
                    // Handle error if removing property fails
                    console.error('Error removing property profile:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                // Send success message as a response
                res.status(200).json({ message: "Property profile successfully removed." });
            });
        }
    });
};

module.exports = {
    getProperties,
    getPropertyById,
    addProperty,
    updateProperty,
    removeProperty
};
