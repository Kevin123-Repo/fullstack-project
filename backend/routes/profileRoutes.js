const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');

const router = express.Router();


router.get('/user', getProfile);  
// router.put('/:user_id', updateProfile);  


module.exports = router;
