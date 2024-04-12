const getAllReservations = 'SELECT * FROM reservation'
const getAllReservationsByUserId = 'SELECT * FROM reservation WHERE user_id = $1'
const getAllReservationsByDate = 'SELECT * FROM reservation WHERE date = $1'
const getAllReservationsByFacilityId = 'SELECT * FROM reservation WHERE facility_id = $1'
const getReservationById = 'SELECT * FROM reservation WHERE reservation_id = $1'
const checkIfReservationExists = 'SELECT * FROM reservation WHERE reservation_id = $1'
const checkIfReservationExistsByDetails = 'SELECT * FROM reservation WHERE user_id = $1 AND facility_id = $2 AND date = $3'
const createReservation = 'INSERT INTO reservation (user_id, facility_id, date) VALUES ($1, $2, $3)'
const deleteReservation = 'DELETE FROM reservation WHERE reservation_id = $1'
const updateReservation = 'UPDATE reservation SET user_id = $1, facility_id = $2, date = $3 WHERE reservation_id = $4'

module.exports = {
  getAllReservations,
  getAllReservationsByUserId,
  getAllReservationsByDate,
  getAllReservationsByFacilityId,
  getReservationById,
  checkIfReservationExists,
  checkIfReservationExistsByDetails,
  createReservation,
  deleteReservation,
  updateReservation
}
