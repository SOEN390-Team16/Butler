const express = require('express')
const CondoOwnerRoutes = require('./src/CondoOwner/routes')
const CondoRenterRoutes = require('./src/CondoRenter/routes')
const CMCRoutes = require('./src/CMC/routes')
const PublicUserRoutes = require('./src/PublicUser/routes')
const PropertyRoutes = require('./src/Property/routes')
const Login = require('./src/Login/routes')
const cors = require('cors');
const tokenRouter = require('./src/auth/refreshToken');
const RegistrationRoutes = require('./src/RegistrationKey/routes');
const CondoUnitRoutes = require('./src/CondoUnit/routes');

const app = express()
const port = 3000

app.use(express.json())

app.use(cors())

app.use('/api/v1/co', CondoOwnerRoutes);
app.use('/api/v1/cr', CondoRenterRoutes);
app.use('/api/v1/cmc', CMCRoutes);
app.use('/api/v1/pu', PublicUserRoutes);
app.use('/api/v1/login', Login);
app.use('/api/v1/reg', RegistrationRoutes);
app.use('/api/v1/pp', PropertyRoutes);
app.use('/api/v1/token', tokenRouter);
app.use('/api/v1/cu', CondoUnitRoutes);

app.listen(port, () => console.log(`app listening on ${port}`));
