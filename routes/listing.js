const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const listingValidastion = require('../Validation/listingValidation');
const {isAuth,isOwner} = require('../middleware.js');
const listingController = require('../controller/listing.js');



// Show listing
router.get('/show/:id', wrapAsync (listingController.showListing));

// Render Edit form
router.get('/edit/:id',isOwner, wrapAsync (listingController.editForm))

// Edit listing
router.put('/edit/:id',isOwner,listingValidastion, wrapAsync (listingController.editListing))

// Delete Listing
router.delete('/delete/:id', isOwner, wrapAsync (listingController.destroyListing))

// Render new listing 
router.get('/add', isAuth, wrapAsync (listingController.newListingForm))

// Add new listing
router.post('/add',isAuth,wrapAsync (listingController.addListing))

module.exports = router;