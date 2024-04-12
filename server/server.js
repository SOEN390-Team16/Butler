const express = require("express");
const CondoOwnerRoutes = require("./src/CondoOwner/routes");
const CondoRenterRoutes = require("./src/CondoRenter/routes");
const CMCRoutes = require("./src/CMC/routes");
const PublicUserRoutes = require("./src/PublicUser/routes");
const PropertyRoutes = require("./src/Property/routes");
const Login = require("./src/Login/routes");
const RegistrationRoutes = require("./src/RegistrationKey/routes");
const CondoUnitRoutes = require("./src/CondoUnit/routes");
const tokenRouter = require("./src/auth/refreshToken");
const lockerRoutes = require("./src/Locker/routes");
const assignedLockerRoutes = require("./src/assigned_locker/routes");
const employeeRoutes = require("./src/Employee/routes");
const parkingSpotRoutes = require("./src/ParkingSpot/routes");
const assignedParkingSpotRoutes = require("./src/assigned_ParkingSpot/routes");
const RequestRoutes = require("./src/Request/routes");
const ReportRoutes = require("./src/Report/routes");
const facilityRoutes = require("./src/Facility/routes");
const reservationRoutes = require("./src/Reservation/routes");
const operationRoutes = require("./src/Operations/routes");
const imageRoutes = require("./src/image/routes");

const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

app.use("/api/v1/co", CondoOwnerRoutes);
app.use("/api/v1/cr", CondoRenterRoutes);
app.use("/api/v1/cmc", CMCRoutes);
app.use("/api/v1/pu", PublicUserRoutes);
app.use("/api/v1/login", Login);
app.use("/api/v1/reg", RegistrationRoutes);
app.use("/api/v1/pp", PropertyRoutes);
app.use("/api/v1/cu", CondoUnitRoutes);
app.use("/api/v1/token", tokenRouter);
app.use("/api/v1/l", lockerRoutes);
app.use("/api/v1/al", assignedLockerRoutes);
app.use("/api/v1/ps", parkingSpotRoutes);
app.use("/api/v1/aps", assignedParkingSpotRoutes);
app.use("/api/v1/emp", employeeRoutes);
app.use("/api/v1/req", RequestRoutes);
app.use("/api/v1/rep", ReportRoutes);

app.use("/api/v1/fa", facilityRoutes);
app.use("/api/v1/res", reservationRoutes);
app.use("/api/v1/op", operationRoutes);
app.use("/api/v1/image", imageRoutes);

app.listen(port, () => console.log(`app listening on ${port}`));
