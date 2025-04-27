const express = require('express');
const formController = require('../controllers/formController');
const router = express.Router();

router.post('/submit', formController.submitForm);
router.get('/', formController.getAllForms);

module.exports = router;