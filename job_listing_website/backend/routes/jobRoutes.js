const express = require('express');
const { getJobs, searchJobs } = require('../controllers/jobController');

const router = express.Router();

// Route to get all jobs
router.get('/', getJobs);

// Route for advanced job search
router.get('/search', searchJobs);

module.exports = router;
