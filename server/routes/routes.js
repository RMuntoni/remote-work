// Import express
const express = require('express')

// Import movies-controller
const moviesRoutes = require('./../controllers/controller.js')

// Create router
const router = express.Router()

//get all movies or filtered movies
router.get('/get', moviesRoutes.getMovies);

// Export router
module.exports = router