require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
    // const refreshToken = req.body.refreshToken;
    // const email = (await jwt.decode(refreshToken)).email;
    const username = req.body.username
    const user = { name: username}
    // jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err) => {
    //     if (err) return res.sendStatus(403);
    //     const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    //     res.json({ accessToken: accessToken });
    // });

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});

module.exports = router;