const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');


router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/userProfile', ctrlUser.userProfile);
router.get('/getAllusers', ctrlUser.getAllusers);
router.post('/delete', ctrlUser.delete);



module.exports = router;



