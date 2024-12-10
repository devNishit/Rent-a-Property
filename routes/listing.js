const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const listingValidastion = require('../Validation/listingValidation');
const {isAuth,isOwner} = require('../middleware.js');
const listingController = require('../controller/listing.js');



// Show listing
router.get('/show/:id', wrapAsync (listingController.showListing));

// Edit listing
router.route('/edit/:id')
.get(isOwner, wrapAsync (listingController.editForm))
.put(isOwner,listingValidastion, wrapAsync (listingController.editListing))

// Delete Listing
router.delete('/delete/:id', isOwner, wrapAsync (listingController.destroyListing))

// Add new listing
router.route('/add')
.get( isAuth, wrapAsync (listingController.newListingForm))
.post(isAuth,wrapAsync (listingController.addListing))

module.exports = router;