const mongoose = require('mongoose');
const listing=require('../models/listings');

// connection to mongooes
async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/RentProperty');
}

main().catch(e=>console.log(e));


const properties = [
  {
    title: "Luxury Villa",
    description: "A stunning 5-bedroom villa with a pool and sea view, perfect for a luxurious vacation. Enjoy modern amenities and close proximity to the beach. Ideal for families or large groups.",
    image: "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8fDA%3D",
    country: "USA",
    location: "Miami, Florida",
    price: 1200 // per night
  },
  {
    title: "Modern Apartment",
    description: "A beautiful 2-bedroom apartment located in the city center, perfect for business travelers or couples. Walking distance to shopping areas and restaurants.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlfGVufDB8fDB8fHww",
    country: "Canada",
    location: "Toronto, Ontario",
    price: 350 // per night
  },
  {
    title: "Country House",
    description: "A peaceful country house surrounded by nature, ideal for a quiet retreat. Enjoy the tranquility of the countryside while being close to popular hiking trails.",
    image: "https://images.unsplash.com/photo-1472224371017-08207f84aaae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdXNlfGVufDB8fDB8fHww",
    country: "UK",
    location: "Cotswolds, England",
    price: 200 // per night
  },
  {
    title: "Beachfront Condo",
    description: "A cozy beachfront condo with direct access to the beach. Perfect for those looking to enjoy sun, sand, and sea. Includes full kitchen and balcony with ocean views.",
    image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D",
    country: "Mexico",
    location: "Cancún",
    price: 450 // per night
  },
  {
    title: "Penthouse Suite",
    description: "A luxurious penthouse suite with panoramic city views, ideal for special occasions or a high-end getaway. Private terrace and high-end furnishings included.",
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    country: "USA",
    location: "New York City, New York",
    price: 1500 // per night
  },
  {
    title: "Suburban Home",
    description: "A spacious 4-bedroom home in a quiet suburban neighborhood, perfect for families. Close to local parks and schools. Full kitchen, backyard, and free parking available.",
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    country: "Australia",
    location: "Sydney, New South Wales",
    price: 400 // per night
  },
  {
    title: "Cozy Cabin",
    description: "A quaint cabin nestled in the mountains, perfect for a cozy getaway. Fireplace and outdoor seating make it ideal for winter vacations or nature retreats.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
    country: "USA",
    location: "Aspen, Colorado",
    price: 300 // per night
  },
  {
    title: "Luxury Farmhouse",
    description: "A large farmhouse with modern amenities, surrounded by vineyards. Perfect for hosting events or a countryside escape. Private chef services available upon request.",
    image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
    country: "France",
    location: "Provence",
    price: 600 // per night
  },
  {
    title: "Urban Loft",
    description: "A stylish loft in the heart of the city, ideal for solo travelers or couples. Close to public transport, restaurants, and nightlife. Modern interior with open floor plan.",
    image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
    country: "Germany",
    location: "Berlin",
    price: 250 // per night
  },
  {
    title: "Lake House",
    description: "A serene lake house with a private dock, perfect for a relaxing lakeside retreat. Kayaks and paddleboards are available for guests. Great for fishing and water sports.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVhbHxlbnwwfHwwfHx8MA%3D%3D",
    country: "Canada",
    location: "Vancouver, British Columbia",
    price: 500 // per night
  },
  {
    title: "Desert Villa",
    description: "A beautiful villa situated in a desert landscape, featuring a private pool and stunning sunset views. Ideal for those looking for a unique and secluded vacation.",
    image: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlYWx8ZW58MHx8MHx8fDA%3D",
    country: "UAE",
    location: "Dubai",
    price: 800 // per night
  },
  {
    title: "Mountain Retreat",
    description: "A luxurious mountain retreat with breathtaking views. Enjoy skiing in the winter or hiking in the summer. Includes hot tub and private chef services upon request.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJlYWx8ZW58MHx8MHx8fDA%3D",
    country: "Switzerland",
    location: "Zermatt",
    price: 950 // per night
  },
  {
    title: "Ski Chalet",
    description: "A luxurious ski chalet located near the slopes, perfect for a winter vacation. Fully equipped kitchen, sauna, and cozy living spaces make it ideal for groups.",
    image: "https://plus.unsplash.com/premium_photo-1682377521697-bc598b52b08a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
    country: "France",
    location: "Chamonix",
    price: 1200 // per night
  }
];

  
  
  
async function dbInIt(){
    // Delete existing data
   await listing.deleteMany({});

   // Add New listing
   await listing.insertMany(properties);

   console.log("DB succesfylly init");
};

dbInIt();