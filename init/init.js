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
    image: {
      path: "https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2V8ZW58MHx8MHx8fDA%3D",
      filename: "Rent a Property"
    },
    country: "USA",
    location: "Miami, Florida",
    price: 1200,
    geoData: { type: "Point", coordinates: [-80.1917902, 25.7616798] }
  },
  {
    title: "Modern Apartment",
    description: "A beautiful 2-bedroom apartment located in the city center, perfect for business travelers or couples. Walking distance to shopping areas and restaurants.",
    image: {
      path: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlfGVufDB8fDB8fHww",
      filename: "Rent a Property"
    },
    country: "Canada",
    location: "Toronto, Ontario",
    price: 350,
    geoData: { type: "Point", coordinates: [-79.3831843, 43.653226] }
  },
  {
    title: "Country House",
    description: "A peaceful country house surrounded by nature, ideal for a quiet retreat. Enjoy the tranquility of the countryside while being close to popular hiking trails.",
    image: {
      path: "https://images.unsplash.com/photo-1472224371017-08207f84aaae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdXNlfGVufDB8fDB8fHww",
      filename: "Rent a Property"
    },
    country: "UK",
    location: "Cotswolds, England",
    price: 200,
    geoData: { type: "Point", coordinates: [-1.720085, 51.833111] }
  },
  {
    title: "Beachfront Condo",
    description: "A cozy beachfront condo with direct access to the beach. Perfect for those looking to enjoy sun, sand, and sea. Includes full kitchen and balcony with ocean views.",
    image: {
      path: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D",
      filename: "Rent a Property"
    },
    country: "Mexico",
    location: "Cancún",
    price: 450,
    geoData: { type: "Point", coordinates: [-86.8475009, 21.161908] }
  },
  {
    title: "Penthouse Suite",
    description: "A luxurious penthouse suite with panoramic city views, ideal for special occasions or a high-end getaway. Private terrace and high-end furnishings included.",
    image: {
      path: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
      filename: "Rent a Property"
    },
    country: "USA",
    location: "New York City, New York",
    price: 1500,
    geoData: { type: "Point", coordinates: [-74.006, 40.7128] }
  },
  {
    title: "Suburban Home",
    description: "A spacious 4-bedroom home in a quiet suburban neighborhood, perfect for families. Close to local parks and schools. Full kitchen, backyard, and free parking available.",
    image: {
      path: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
      filename: "Rent a Property"
    },
    country: "Australia",
    location: "Sydney, New South Wales",
    price: 400,
    geoData: { type: "Point", coordinates: [151.2093, -33.8688] }
  },
  {
    title: "Cozy Cabin",
    description: "A quaint cabin nestled in the mountains, perfect for a cozy getaway. Fireplace and outdoor seating make it ideal for winter vacations or nature retreats.",
    image: {
      path: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
      filename: "Rent a Property"
    },
    country: "USA",
    location: "Aspen, Colorado",
    price: 300,
    geoData: { type: "Point", coordinates: [-106.8183, 39.1911] }
  },
  {
    title: "Luxury Farmhouse",
    description: "A large farmhouse with modern amenities, surrounded by vineyards. Perfect for hosting events or a countryside escape. Private chef services available upon request.",
    image: {
      path: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
      filename: "Rent a Property"
    },
    country: "France",
    location: "Provence",
    price: 600,
    geoData: { type: "Point", coordinates: [5.113152, 43.529742] }
  },
  {
    title: "Urban Loft",
    description: "A stylish loft in the heart of the city, ideal for solo travelers or couples. Close to public transport, restaurants, and nightlife. Modern interior with open floor plan.",
    image: {
      path: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
      filename: "Rent a Property"
    },
    country: "Germany",
    location: "Berlin",
    price: 250,
    geoData: { type: "Point", coordinates: [13.404954, 52.520008] }
  },
  {
    title: "Lake House",
    description: "A serene lake house with a private dock, perfect for a relaxing lakeside retreat. Kayaks and paddleboards are available for guests. Great for fishing and water sports.",
    image: {
      path: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmVhbHxlbnwwfHwwfHx8MA%3D%3D",
      filename: "Rent a Property"
    },
    country: "Canada",
    location: "Vancouver, British Columbia",
    price: 500,
    geoData: { type: "Point", coordinates: [-123.1216, 49.2827] }
  }
];



// add owner name to listings
for (const obj of properties) {
  obj.owner = '675568ee2d02385d9ce1c98f';
}
  
  
async function dbInIt(){
    // Delete existing data
   await listing.deleteMany({});

   // Add New listing
   await listing.insertMany(properties);

   console.log("DB succesfylly init");
};

dbInIt();