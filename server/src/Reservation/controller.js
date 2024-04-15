const pool = require("../../db");
const queries = require("./queries");

const getAllReservations = (req, res) => {
  console.log("Get All Reservations");

  pool.query(queries.getAllReservations, (error, results) => {
    if (error) {
      console.error('Error fetching reservations:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Reservations not found' })
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getReservationsByUserId = (req, res) => {
  console.log("Get Reservations by User Id");

  const userid = parseInt(req.params.userid)

  pool.query(queries.getAllReservationsByUserId, [userid], (error, results) => {
    if (error) {
      console.error('Error fetching reservations:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Reservations not found' })
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getReservationsByDate = (req, res) => {
  console.log("Get Reservations by Date");

  const date = req.params.date;

  pool.query(queries.getAllReservationsByDate, [date], (error, results) => {
    if (error) {
      console.error('Error fetching reservations:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Reservations not found' })
    } else {
      res.status(200).json(results.rows);
    }
  });
};

const getReservationsByFacilityId = (req, res) => {
  console.log("Get Reservations by Facility Id");

  const facilityid = parseInt(req.params.facilityid);

  pool.query(queries.getAllReservationsByFacilityId, [facilityid], (error, results) => {
    if (error) {
      console.error('Error fetching reservations:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Reservations not found' })
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const getReservationsByPropertyId = (req, res) => {
  console.log("Get Reservations by Property Id");

  const propertyid = parseInt(req.params.propertyid);

  pool.query(queries.getAllReservationsByPropertyId, [propertyid], (error, results) => {
    if (error) {
      console.error('Error fetching reservations:', error)
      return res.status(500).json({ error: 'Internal Server Error' })
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: 'Reservations not found' })
    } else {
      res.status(200).json(results.rows)
    }
  );
};

const getReservationById = (req, res) => {
  console.log("Get Reservation by Id");

  const reservationid = parseInt(req.params.reservationid);

  pool.query(queries.getReservationById, [reservationid], (error, results) => {
    if (error) {
      console.error("Error fetching reservation:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    } else if (results.rowCount === 0) {
      return res.status(404).json({ error: "Reservation not found" });
    } else {
      res.status(200).json(results.rows[0]);
    }
  });
};

const createReservation = (req, res) => {
  console.log("Create Reservation");

  const { user_id, facility_id, date } = req.body;

  pool.query(
    queries.checkIfReservationExistsByDetails,
    [facility_id, date],
    (error, results) => {
      if (error) {
        console.error("Error checking reservation existence:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      } else if (results.rowCount > 0) {
        return res.status(400).json({ error: "Reservation already exists" });
      } else {
        pool.query(
          queries.createReservation,
          [user_id, facility_id, date],
          (error, results) => {
            if (error) {
              console.error("Error creating reservation:", error);
              return res.status(500).json({ error: "Internal Server Error" });
            } else {
              res
                .status(201)
                .json({ message: "Reservation created successfully" });
            }
          }
        );
      }
    }
  );
};

const deleteReservation = (req, res) => {
  console.log("Delete Reservation");

  const reservationid = parseInt(req.params.reservationid);

  pool.query(queries.deleteReservation, [reservationid], (error, results) => {
    if (error) {
      console.error("Error deleting reservation:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Reservation deleted successfully" });
    }
  });
};

const updateReservation = (req, res) => {
  console.log("Update Reservation");

  const reservationid = parseInt(req.params.reservationid);
  const { user_id, facility_id, date } = req.body;

  pool.query(
    queries.checkIfReservationExists,
    [reservationid],
    (error, results) => {
      if (error) {
        console.error("Error checking reservation existence:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      } else if (results.rowCount === 0) {
        return res.status(404).json({ error: "Reservation not found" });
      } else {
        pool.query(
          queries.updateReservation,
          [user_id, facility_id, date, reservationid],
          (error, results) => {
            if (error) {
              console.error("Error updating reservation:", error);
              return res.status(500).json({ error: "Internal Server Error" });
            } else {
              res
                .status(200)
                .json({ message: "Reservation updated successfully" });
            }
          }
        );
      }
    }
  );
};

module.exports = {
  getAllReservations,
  getReservationsByUserId,
  getReservationsByDate,
  getReservationsByFacilityId,
  getReservationsByPropertyId,
  getReservationById,
  getFacilityStatus,
  createReservation,
  deleteReservation,
  updateReservation,
};
