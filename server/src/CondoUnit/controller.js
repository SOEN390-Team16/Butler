const pool = require('../../db');
const queries = require('./queries');

const getCondoUnits = (req, res) => {
    console.log("Get All Condo Units");

    pool.query(queries.getCondoUnits, (error, results) => {
        if (error) {
            console.error('Error finding condo units:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const getCondoUnitById = (req, res) => {
    console.log('Get a specific condo unit profile');

    const condoid = parseInt(req.params.condoid);

    pool.query(queries.getCondoUnitById, [condoid], (error, results) => {
        if (error) {
            console.error('Error fetching condo unit profile:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Condo unit not found' });
        } else {
            res.status(200).json(results.rows.at(0));
        }
    });
};

const addCondoUnit = (req, res) => {
    console.log('Add a Condo Unit');
    const { condoid, lockerid, parkingid, companyid, propertyid, condo_size, condo_fee, condo_number } = req.body;

    pool.query(queries.checkIfCondoUnitExistsById, [condoid], (error, results) => {
        if (error) {
            console.error('Error checking condo unit existence:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount > 0) {
            return res.status(400).json({ error: 'Condo unit already exists' });
        } else {
            pool.query(queries.addCondoUnit, [condoid, lockerid, parkingid, companyid, propertyid, condo_size, condo_fee, condo_number], (error, results) => {
                if (error) {
                    console.error('Error adding condo unit:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.status(201).json({ message: 'Condo unit added successfully' });
                }
            });
        }
    });
};

const removeCondoUnit = (req, res) => {
    console.log('Remove a Condo Unit');

    const condoid = parseInt(req.params.condoid);

    pool.query(queries.removeCondoUnit, [condoid], (error, results) => {
        if (error) {
            console.error('Error removing condo unit:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ message: 'Condo unit removed successfully' });
        }
    });
};

const updateCondoUnit = (req, res) => {
    console.log('Update a Condo Unit');

    const condoid = parseInt(req.params.condoid);
    const { lockerid, parkingid, companyid, propertyid, condo_size, condo_fee, condo_number } = req.body;

    pool.query(queries.checkIfCondoUnitExistsById, [condoid], (error, results) => {
        if (error) {
            console.error('Error checking condo unit existence:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Condo unit not found' });
        } else {
            pool.query(queries.updateCondoUnit, [lockerid, parkingid, companyid, propertyid, condo_size, condo_fee, condo_number, condoid], (error, results) => {
                if (error) {
                    console.error('Error updating condo unit:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.status(200).json({ message: 'Condo unit updated successfully' });
                }
            });
        }
    });
}

module.exports = {
    getCondoUnits,
    getCondoUnitById,
    addCondoUnit,
    removeCondoUnit,
    updateCondoUnit,
    calculateCondoFee
}