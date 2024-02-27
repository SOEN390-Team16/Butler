const express = require('express')
const CondoOwnerRoutes = require('./src/CondoOwner/routes')
const CondoRenterRoutes = require('./src/CondoRenter/routes')
const CMCRoutes = require('./src/CMC/routes')
const PublicUserRoutes = require('./src/PublicUser/routes')
const cors = require('cors');
const { pool } = require("./db");
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/co", CondoOwnerRoutes);
app.use("/api/v1/cr", CondoRenterRoutes);
app.use("/api/v1/cmc", CMCRoutes);
app.use("/api/v1/pu", PublicUserRoutes);

app.listen(port, () => console.log(`app listening on ${port}`));
