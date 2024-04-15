const { Router } = require("express");
const controller = require("./controller");
const authenticateToken = require("../auth/tokenValidator");
const router = Router();

router.get("/", authenticateToken, controller.getAllReservations);
router.get(
  "/user/:userid",
  authenticateToken,
  controller.getReservationsByUserId
);
router.get("/date/:date", authenticateToken, controller.getReservationsByDate);
router.get(
  "/facility/:facilityid",
  authenticateToken,
  controller.getReservationsByFacilityId
);
router.get(
  "/property/:propertyid",
  authenticateToken,
  controller.getReservationsByPropertyId
);
router.get("/:reservationid", authenticateToken, controller.getReservationById);
router.get(
  "/status/:facilityid",
  authenticateToken,
  controller.getFacilityStatus
);
router.post("/", authenticateToken, controller.createReservation);
router.delete(
  "/:reservationid",
  authenticateToken,
  controller.deleteReservation
);
router.patch(
  "/:reservationid",
  authenticateToken,
  controller.updateReservation
);

module.exports = router;
