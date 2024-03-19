const pool = require('../../db');
const queries = require('./queries');

const getAllParkingCondoPairs = (req,res) => {
    console.log("Getting All parking-condo pairs.")
    pool.query(queries.getAllParkingCondoPairs, (error, results) => {
        if(error){
            console.error("Error finding parking-condo pairs: ", error);
            res.status(500).json({error: "Internal Server Error"});
        }
        if(results.rowCount === 0){
            return res.status(404).json({ error: "parking-condo pairs not found" });
        }
        else{
            res.status(200).json(results.rows)
        }
    });
}

const getAllLockerCondoPairs = (req,res) => {
    console.log("Getting All locker-condo pairs.")
    pool.query(queries.getAllLockerCondoPairs, (error, results) => {
        if(error){
            console.error("Error finding locker-condo pairs:", error);
            res.status(500).json({error: "Internal Server Error"});
        }
        if(results.rowCount === 0){
            return res.status(404).json({ error: "locker-condo pairs not found" });
        }
        else{
            res.status(200).json(results.rows)
        }
    });
}

const getParkingByCondoId = (req,res) => {
    console.log("Getting parking from condo id");
    const condoid = parseInt(req.params.condoid);
    pool.query(queries.getParkingByCondoId, [condoid], (error, results) =>{
        if(error){
            console.error("Error finding parking by condo id: ",error);
            res.status(500).json({error: "Internal Server Error"});
        }
        if(results.rowCount === 0){
            res.status(400).json({error: "Parking Not Found"});
        }
        else{
            res.status(200).json(results.rows);
        };
    });
};
const getCondoByParkingId = (req,res) => {
    console.log("Getting a unit by parking id");
    const parkingid = parseInt(req.params.parkingid);
    pool.query(queries.getCondoByParkingId, [parkingid], (error, results) =>{
        if(error){
            console.error("Error finding unit by parking id: ",error);
            res.status(500).json({error: "Internal Server Error"});
        }
        if(results.rowCount === 0){
            res.status(400).json({error: "Condo Unit Not Found By Parking Id"});
        }
        else{
            res.status(200).json(results.rows);
        };
    });
};
const getLockerByCondoId = (req,res) => {
    console.log("Getting a locker by condo id");
    const condoid = parseInt(req.params.condoid);
    pool.query(queries.getLockerByCondoId, [condoid], (error, results) =>{
        if(error){
            console.error("Error finding locker by condo id: ",error);
            res.status(500).json({error: "Internal Server Error"});
        }
        if(results.rowCount === 0){
            res.status(400).json({error: "Locker Not Found"});
        }
        else{
            res.status(200).json(results.rows);
        };
    });
};
const getCondoByLockerId = (req,res) => {
    console.log("Getting a unit by locker id");
    const lockerid = parseInt(req.params.lockerid);
    pool.query(queries.getCondoByLockerId, [lockerid], (error, results) =>{
        if(error){
            console.error("Error finding unit by locker id: ",error);
            res.status(500).json({error: "Internal Server Error"});
        }
        if(results.rowCount === 0){
            res.status(400).json({error: "Condo Unit Not Found From Locker Id"});
        }
        else{
            res.status(200).json(results.rows);
        };
    });
};

const addParkingCondoPair = (req,res) => {
    console.log("Adding Parking-Condo Pair ");
    const{parking_number, property_name , condo_number} = req.body;
    console.log("property_name: ",property_name)
    pool.query(queries.checkIfPropertyExists, [property_name], (error, results) => {
        if(error){
            console.error("Error finding property: ", error);
            res.status(500).json({error: "Internal Server Error"});
        }
        else if(results.rowCount < 1){
            res.status(400).json({error: "Property Doesn't Exists"})
        }
        else{
            pool.query(queries.checkIfCondoExists, [condo_number], (error, results) => {
                if(error){
                    console.error("Error finding condo: ", error);
                    res.status(500).json({error: "Internal Server Error"});
                }
                if(results.rowCount < 1){
                    res.status(400).json({error: "Condo Doesn't Exists"})
                }
                else{
                    pool.query(queries.checkIfParkingExists, [parking_number], (error, results) => {
                        if(error){
                            console.error("Error finding parking: ", error);
                            res.status(500).json({error: "Internal Server Error"});
                        }
                        if(results.rowCount < 1){
                            res.status(400).json({error: "Parking Doesn't Exists"})
                        }
                        else{
                            pool.query(queries.addParkingCondoPair, [property_name, parking_number, condo_number], (error, results) => {
                                if(error){
                                    console.error("Error creating parking-condo pair: ", error);
                                    res.status(500).json({error: "Internal Server Error"});
                                }
                                else{
                                    res.status(200).json({message: "Parking Successfully Assigned to Condo"});
                                }
                            })
                        }
                    })
                }
            })
        }
    })
};

const addLockerCondoPair = (req,res) => {
    console.log("Adding Locker-Condo Pair");
    const{property_name, locker_number, condo_number} = req.body;

    pool.query(queries.checkIfPropertyExists, [property_name], (error, results) => {
        if(error){
            console.error("Error finding property: ", error);
            res.status(500).json({error: "Internal Server Error"});
        }
        if(results.rowCount < 1){
            res.status(400).json({error: "Property Doesn't Exists"})
        }
        else{
            pool.query(queries.checkIfCondoExists, [condo_number], (error, results) => {
                if(error){
                    console.error("Error finding condo: ", error);
                    res.status(500).json({error: "Internal Server Error"});
                }
                if(results.rowCount < 1){
                    res.status(400).json({error: "Condo Doesn't Exists"})
                }
                else{
                    pool.query(queries.checkIfParkingExists, [locker_number], (error, results) => {
                        if(error){
                            console.error("Error finding locker: ", error);
                            res.status(500).json({error: "Internal Server Error"});
                        }
                        if(results.rowCount < 1){
                            res.status(400).json({error: "Locker Doesn't Exists"})
                        }
                        else{
                            pool.query(queries.addLockerCondoPair, [property_name, locker_number, condo_number], (error, results) => {
                                if(error){
                                    console.error("Error creating locker-condo pair: ", error);
                                    res.status(500).json({error: "Internal Server Error"});
                                }
                                else{
                                    res.status(200).json({message: "Locker Successfully Assigned to Condo"});
                                }
                            })
                        }
                    })
                }
            })
        }
    })
};

const removeParkingCondoPair = (req,res) => {
    console.log("remove parking-condo pair");
    const condoid = parseInt(req.params.condoid);
    pool.query(queries.getParkingByCondoId, [condoid], (error, results) =>{
        if(error){
            console.error("Error finding parking-condo pair");
            res.status(500).json({error: "Internal Server Error"});
        }
        if(results.rowCount === 0){
            res.status(400).json({error: "parking-condo pair Unit Not Found"});
        }
        else{
            pool.query(queries.removeParkingCondoPair, [condoid], (error) =>  {
                if(error){
                    console.error("Error removing parking-condo pair");
                    res.status(500).jason({error: "Internal Server Error"});
                }
                else{
                    res.status(200).json({message: "Parking-Condo Pair Removed Successfully"})
                };
            });
        };
    });
};

const removeLockerCondoPair = (req,res) => {
    console.log("remove locker-condo pair");
    const condoid = parseInt(req.params.condoid);
    pool.query(queries.getLockerByCondoId, [condoid], (error, results) =>{
        if(error){
            console.error("Error finding locker-condo pair");
            res.status(500).json({error: "Internal Server Error"});
        }
        if(results.rowCount === 0){
            res.status(400).json({error: "locker-condo pair Not Found"});
        }
        else{
            pool.query(queries.removeLockerCondoPair, [condoid], (error) =>  {
                if(error){
                    console.error("Error removing locker-condo pair");
                    res.status(500).jason({error: "Internal Server Error"});
                }
                else{
                    res.status(200).json({message: "locker-condo pair Removed Successfully"})
                };
            });
        };
    });
};

module.exports = {
    getAllLockerCondoPairs,
    getAllParkingCondoPairs,
    getCondoByLockerId,
    getLockerByCondoId,
    getCondoByParkingId,
    getParkingByCondoId,
    addLockerCondoPair,
    addParkingCondoPair,
    removeLockerCondoPair,
    removeParkingCondoPair
};

