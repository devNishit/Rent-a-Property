const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const listingValidastion = require('../Validation/listingValidation.js');
const {isAuth,isOwner} = require('../middleware.js');
const listingController = require('../controller/listing.js');
const upload = require('../utils/cloudinaryStorage.js');


// Show listing
router.get('/show/:id', wrapAsync (listingController.showListing));

// Edit listing
router.route('/edit/:id')
.get(isOwner, wrapAsync (listingController.editForm))
.put(isOwner,listingValidastion,upload.single('list[image]'), wrapAsync (listingController.editListing))

// Delete Listing
router.delete('/delete/:id', isOwner, wrapAsync (listingController.destroyListing))

// Add new listing
router.route('/add')
.get( isAuth, wrapAsync (listingController.newListingForm))
.post(isAuth,upload.single('list[image]'),listingValidastion,wrapAsync ( listingController.addListing))

module.exports = router;