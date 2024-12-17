const listing=require('../models/listings');
const review=require('../models/reviews');
const featchGeoData=require('../utils/featchGeoData');


// Show listing
module.exports.showListing = async(req,res)=>{
    let {id}= req.params;
    let data = await listing.findById(id).populate('owner');
    
    // get listing ownerId
    req.session.listingOwner = data.owner._id;


    // failer flash msg
    if(!data){
        req.flash('failer','Listing not found');
        res.redirect('/');
    }

    let reviewList=[];

    // fetch reviews
    for(rev of data.review){
        let data = await review.findById(rev).populate('owner');
        reviewList.push(data);
    }
    
    // console.log(reviewList);
    res.render('show.ejs',{data,reviewList});
    
}

// Render Edit form
module.exports.editForm = async(req,res)=>{
    let {id}= req.params;
    let data = await listing.findById(id);
    
    // Decreasing Image Quality
    data.image.path = data.image.path.replace('upload','upload/w_200,f_auto');

    // failer flash msg
    if(!data){
        req.flash('failer','Listing not found');
        res.redirect('/');
    }

    res.render('edit.ejs',{data});
}


// Edit listing
module.exports.editListing = async(req,res)=>{
    let {id}= req.params;
    let newData = req.body['list']; 
    

    // edit image
    if(req.file){
        let {path,filename} = req.file;
        newData.image = {path,filename};
    }


    let update = await listing.findByIdAndUpdate(id,newData,{runValidators: true});

    // upDate GeoData
    let location = req.body['list']['location'];
    let country = req.body['list']['country'];
    if(update.country != country || update.location != location){
        update.geoData = {coordinates: await featchGeoData(location,country), type:"Point"};
        await update.save();
    }
    req.flash('success','Listing successfully edited')
    res.redirect(`/listing/show/${id}`);
}

// Delete listing
module.exports.destroyListing = async(req,res)=>{
    let {id}= req.params;
    let del = await listing.findByIdAndDelete(id);
    console.log(del);
    req.flash('success','Listing successfully deleted')
    res.redirect("/");
}

// Render new listing form
module.exports.newListingForm = (req,res)=>{
    res.render("add.ejs");
}

// Add new listing
    
module.exports.addListing = async (req,res)=>{

    let formData = req.body['list']
    let newList= new listing(formData);

    // add imageInfo    
    let {path, filename} = req.file;
    newList.image = {path,filename};

    // add currUser info
    newList.owner = req.user;

    // add GeoData
    let location = req.body['list']['location'];
    let country = req.body['list']['country'];
    newList.geoData = {coordinates: await featchGeoData(location,country), type:"Point"};
    
    await newList.save();
    req.flash('success','New listing successfully Added');
    res.redirect("/");
}