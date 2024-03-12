const pool = require('../../db');
const queries = require('./queries');

const getAllUnits = (req,res) => {
    console.log("Getting All units.")
    pool.query(queries.getAllCondoUnits, (error, results) => {
        if(error){
            console.error("Error finding condo units:", error);
            res.status(500).json({error: "Internal Server Error"});
        }
        if(results.rowCount === 0){
            return res.status(404).json({ error: "condo units not found" });
        }
        else{
            res.status(200).json(results.rows)
        }
    });
}

const getUnitById = (req,res) => {
    console.log("Getting a unit by id");
    const condoid = parseInt(req.params.condoid);
    pool.query(queries.getCondoUnitById, [condoid], (error, results) =>{
        if(error){
            console.error("Error finding unit by id");
            res.status(500).json({error: "Internal Server Error"});
        }
        if(results.rowCount === 0){
            res.status(400).json({error: "Condo Unit Not Found"});
        }
        else{
            res.status(200).json(results.rows);
        };
    });
};

const addCondoUnit = (req,res) => {
    console.log("Adding Condo Unit ");
    const{lockerid, parkingid, companyid, propertyid, condo_size, condo_fee, condo_number} = req.body;
    pool.query(queries.getUnitByNumber, [condo_number], (error, resilts) => {
        if(error){
            console.error("Error finding condo unit");
            res.status(500).json({error: "Internal Server Error"});
        }
        if(resilts.rowCount > 0){
            res.status(400).json({error: "Condo Unit Already Exists"})
        }
        else{
            pool.query(queries.addCondoUnit,
                [lockerid, parkingid, companyid, propertyid, condo_size, condo_fee, condo_number],
                (error) => {
                    if(error){
                        console.error("Error creating condo unit");
                        res.status(500).json({error: "Internal Server Error"});
                    }
                    else{
                        pool.query(queries.getCondoUnitByNumber, [condo_number], (results) => {
                            res.status(200).json(results);
                        });
                    };
            });
        }
    }); 
};

const updateCondoUnit = (req,res) => {
    console.log("Updating Condo Unit");
    const condoid = parseInt(req.params.condoid);
    const { lockerid, parkingid, condo_fee } = req.body;

    if (
      !lockerid &&
      !parkingid &&
      !condo_fee
    ) {
      return res
        .status(400)
        .json({ error: "At least one field is required for updating" });
    }
  
    const setClauses = [];
    const values = [];
  
    if (first_name) {
      setClauses.push("locker_id = $" + (values.length + 1));
      values.push(first_name);
    }
    if (last_name) {
      setClauses.push("parkingid = $" + (values.length + 1));
      values.push(last_name);
    }
    if (email) {
      setClauses.push("condo_fee = $" + (values.length + 1));
      values.push(email);
    }
  
    const query = `UPDATE condo_unit SET ${setClauses} WHERE condoid = (${condoid})`;
  
    pool.query(queries.getCondoUnitById, [condoid], (error, results) => {
      if (error) {
        console.error("Error finding condo unit:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.rows.length === 0) {
        return res.status(404).json({ error: "Ccondo Unit Not Found" });
      } else {
        pool.query(query, (error, result) => {
            if (error) {
            console.error("Error updating condo renter:", error);
            return res.status(500).json({ error: "Internal Server Error" });
            }

            if (result.rowCount === 0) {
            return res.status(404).json({ error: "condo unit not found" });
            }
            else{
                pool.query(queries.getCondoUnitById, [condoid], (error, results) =>{
                    if(error){
                        console.error("Error finding unit by id");
                        res.status(500).json({error: "Internal Server Error"});
                    }
                    if(results.rowCount === 0){
                        res.status(400).json({error: "Condo Unit Not Found"});
                    }
                    else{
                        res.status(200).json(results.rows);
                    };
                });
            }
          res.status(200).json({ message: "condo unit updated successfully" });
        });
      }
    });
};

const removeCondoUnit = (req,res) => {
    console.log("remove condo unit");
    const condoid = parseInt(req.params.condoid);
    pool.query(queries.getCondoUnitById, [condoid], (error, results) =>{
        if(error){
            console.error("Error finding unit by id");
            res.status(500).json({error: "Internal Server Error"});
        }
        if(results.rowCount === 0){
            res.status(400).json({error: "Condo Unit Not Found"});
        }
        else{
            pool.query(queries.removeCondoUnit, [condoid], (error) =>  {
                if(error){
                    console.error("Error removing condo unit");
                    res.status(500).jason({error: "Internal Server Error"});
                }
                else{
                    res.status(200).json({message: "Condo Unit Removed Successfully"})
                };
            });
        };
    });
};

module.exports = {
    getAllUnits,
    getUnitById,
    addCondoUnit,
    updateCondoUnit,
    removeCondoUnit
};

