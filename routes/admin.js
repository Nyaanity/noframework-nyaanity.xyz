const express = require('express');
const router = express.Router()
const pool = require('../database').pool;

router.get('/keys/new', (req, res) => {
    console.log(req.query)
    if(req.query.admin == 'oZp$nv!EzVSHqfTVZ2znEMC@5k^*XouEePk$*BZaxWB6P@qr!a'){
        await pool.query('INSERT INTO authkeys(name) VALUES(?)', [req.query.name])
        res.status(200).redirect('/')
        return
    }
    res.status(401).send('Unauthorized.')
})


module.exports= router;