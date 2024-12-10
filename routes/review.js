const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync');
const reviewValidastion = require('../Validation/reviewValidation');
const {isAuth} = require('../middleware.js');
const reviewController = require('../controller/review.js');

// Add new Review
router.post('/add',isAuth, reviewValidastion, wrapAsync(reviewController.addReview))

//Delete the Review
router.delete('/:id', wrapAsync(reviewController.destroyReview))

module.exports = router;