const pool = require('../../db');
const queriesCU = require('./queries');
const queriesPP = require('../Property/queries');

const getCondoUnits = (req, res) => {
    console.log("Get All Condo Units");

    pool.query(queriesCU.getCondoUnits, (error, results) => {
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

    pool.query(queriesCU.getCondoUnitById, [condoid], (error, results) => {
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
    const { companyid, propertyid, condo_number, size, occupant_type, total_fees } = req.body;

    pool.query(queriesCU.checkIfCondoUnitExists, [condoid], (error, results) => {
        if (error) {
            console.error('Error checking condo unit existence:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount > 0) {
            return res.status(400).json({ error: 'Condo unit already exists' });
        } else {
            pool.query(queriesCU.addCondoUnit, [companyid, propertyid, condo_number, size, occupant_type, total_fees], (error, results) => {
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

    pool.query(queriesCU.removeCondoUnit, [condoid], (error, results) => {
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
    const { companyid, propertyid, condo_number, size, occupant_type, total_fees } = req.body;

    pool.query(queriesCU.checkIfCondoUnitExists, [condoid], (error, results) => {
        if (error) {
            console.error('Error checking condo unit existence:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Condo unit not found' });
        } else {
            pool.query(queriesCU.updateCondoUnit, [companyid, propertyid, condo_number, size, occupant_type, total_fees, condoid], (error, results) => {
                if (error) {
                    console.error('Error updating condo unit:', error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.status(200).json({ message: 'Condo unit updated successfully' });
                }
            });
        }
    });
};

const calculateTotalCondoFee = (req, res) => {
    console.log('Calculate Total Condo Fee');

    const condoid = parseInt(req.params.condoid);

    pool.query(queriesPP.getCondoFeePerSqrft [condoid], (error, results) => {
        if (error) {
            console.error('Error fetching condo unit:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Condo unit not found' });
        } else {
            const condoInformation = results.rows.at(0);
            const condoSize = condoInformation.size;
            const feePerSquareFoot = condoInformation.condo_fee_per_sqrft;

            const totalCondoFee = condoSize * feePerSquareFoot;
            res.status(200).json({ totalCondoFee });
        }
    });
};


module.exports = {
    getCondoUnits,
    getCondoUnitById,
    addCondoUnit,
    removeCondoUnit,
    updateCondoUnit,
    calculateTotalCondoFee
}