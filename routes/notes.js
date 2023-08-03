const express = require('express')
const router = express.Router()

router.get('/',(re,res)=>{
    obj = {
        a:'shreyasi',
        roll:28
    }
    res.json(obj)
})
module.exports = router