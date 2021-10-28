const express = require('express');
const router = express.Router()
const pool = require('../database').pool;

// .

router.get('/newkey', async (req, res) => {
    if(req.query.admin == 'oZp$nv!EzVSHqfTVZ2znEMC@5k^*XouEePk$*BZaxWB6P@qr!a'){
        await pool.query('INSERT INTO authkeys(name, endsAt) VALUES(?,?)', [req.query.name, 0])
        return res.status(200).redirect('/')
    } else{
        res.status(401).json({
            'message': `Unauthorized. (${req.query.admin})`
        });
    }
})


module.exports= router;