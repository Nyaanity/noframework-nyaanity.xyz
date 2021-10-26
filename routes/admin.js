const express = require('express');
const router = express.Router()
const pool = require('../database').pool;

router.get('/keys/new', (req, res) => {
    console.log('hi');
    if(req.query.admin == 'oZp$nv!EzVSHqfTVZ2znEMC@5k^*XouEePk$*BZaxWB6P@qr!a'){
        await pool.query('INSERT INTO authkeys(name) VALUES(?)', [req.query.name])
        return res.status(200).redirect('/')
    }
    res.status(401).send('Unauthorized.')
})


module.exports= router;