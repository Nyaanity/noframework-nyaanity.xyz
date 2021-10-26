const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: "This site is still in development."})
})


module.exports = router;