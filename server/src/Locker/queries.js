const getAllLockers = "SELECT * FROM parking_spot;";

const getLockerById = "SELECT * FROM parking_spot WHERE condoid = $1;";

const addLockerById = "INSERT INTO parking_spot(condoid) VALUES ($1)"

const removeLocker = "DELETE FROM parking_spot WHERE parkingid = $1";


module.exports = {
    getAllLockers,
    getLockerById,
    addLockerById,
    removeLocker
}