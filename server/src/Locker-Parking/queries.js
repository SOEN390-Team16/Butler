const getAllParkingCondoPairs = "SELECT * FROM assigned_parking_spot;";
const getAllLockerCondoPairs = "SELECT * FROM assigned_locker;";
const getParkingByCondoId = "SELECT * FROM assigned_parking_spot WHERE condoid = $1;";
const getCondoByParkingId = "SELECT * FROM assigned_parking_spot WHERE parkingid = $1;";
const getLockerByCondoId = "SELECT * FROM assigned_locker WHERE condoid = $1;";
const getCondoByLockerId = "SELECT * FROM assigned_locker WHERE lockerid = $1;";
const addParkingCondoPair = "INSERT INTO assigned_parking_spot (propertyid, parkingid, condoid) VALUES ($1, $2, $3);";
const addLockerCondoPair = "INSERT INTO assigned_locker (propertyid, lockerid, condoid) VALUES ($1, $2, $3);";
const removeParkingCondoPair = "DELETE FROM assigned_parking_spot WHERE condoid = $1;";
const removeLockerCondoPair = "DELETE FROM assigned_locker WHERE condoid = $1;";
const checkIfCondoExists = "SELECT * FROM condo_unit WHERE condo_number = $1;";
const checkIfPropertyExists = "SELECT * FROM property WHERE property_name = $1 ;";
const checkIfParkingExists = "SELECT * FROM parking_spot WHERE parking_number = $1;";
const checkIfLockerExists = "SELECT * FROM locker WHERE locker_number = $1;";

module.exports = {
    getAllLockerCondoPairs,
    getAllParkingCondoPairs,
    getParkingByCondoId,
    getCondoByParkingId,
    getLockerByCondoId,
    getCondoByLockerId,
    addLockerCondoPair,
    addParkingCondoPair,
    removeLockerCondoPair,
    removeParkingCondoPair,
    checkIfCondoExists,
    checkIfPropertyExists,
    checkIfParkingExists,
    checkIfLockerExists
}