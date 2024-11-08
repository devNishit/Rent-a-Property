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
      image: "https://pixabay.com/photos/villa-house-home-luxury-1234728/",
      country: "USA",
      location: "Miami, Florida",
      price: 1200 // per night
    },
    {
      title: "Modern Apartment",
      description: "A beautiful 2-bedroom apartment located in the city center, perfect for business travelers or couples. Walking distance to shopping areas and restaurants.",
      image: "https://pixabay.com/photos/apartment-balcony-building-271071/",
      country: "Canada",
      location: "Toronto, Ontario",
      price: 350 // per night
    },
    {
      title: "Country House",
      description: "A peaceful country house surrounded by nature, ideal for a quiet retreat. Enjoy the tranquility of the countryside while being close to popular hiking trails.",
      image: "https://pixabay.com/photos/country-house-rural-landscape-2172844/",
      country: "UK",
      location: "Cotswolds, England",
      price: 200 // per night
    },
    {
      title: "Beachfront Condo",
      description: "A cozy beachfront condo with direct access to the beach. Perfect for those looking to enjoy sun, sand, and sea. Includes full kitchen and balcony with ocean views.",
      image: "https://pixabay.com/photos/beachfront-condo-balcony-sea-view-4395406/",
      country: "Mexico",
      location: "Cancún",
      price: 450 // per night
    },
    {
      title: "Penthouse Suite",
      description: "A luxurious penthouse suite with panoramic city views, ideal for special occasions or a high-end getaway. Private terrace and high-end furnishings included.",
      country: "USA",
      location: "New York City, New York",
      price: 1500 // per night
    },
    {
      title: "Suburban Home",
      description: "A spacious 4-bedroom home in a quiet suburban neighborhood, perfect for families. Close to local parks and schools. Full kitchen, backyard, and free parking available.",
      image: "https://pixabay.com/photos/house-home-suburb-residential-2676843/",
      country: "Australia",
      location: "Sydney, New South Wales",
      price: 400 // per night
    },
    {
      title: "Cozy Cabin",
      description: "A quaint cabin nestled in the mountains, perfect for a cozy getaway. Fireplace and outdoor seating make it ideal for winter vacations or nature retreats.",
      image: "https://pixabay.com/photos/cabin-house-wooden-mountain-2361984/",
      country: "USA",
      location: "Aspen, Colorado",
      price: 300 // per night
    },
    {
      title: "Luxury Farmhouse",
      description: "A large farmhouse with modern amenities, surrounded by vineyards. Perfect for hosting events or a countryside escape. Private chef services available upon request.",
      country: "France",
      location: "Provence",
      price: 600 // per night
    },
    {
      title: "Urban Loft",
      description: "A stylish loft in the heart of the city, ideal for solo travelers or couples. Close to public transport, restaurants, and nightlife. Modern interior with open floor plan.",
      image: "https://pixabay.com/photos/loft-urban-modern-interior-2766135/",
      country: "Germany",
      location: "Berlin",
      price: 250 // per night
    },
    {
      title: "Lake House",
      description: "A serene lake house with a private dock, perfect for a relaxing lakeside retreat. Kayaks and paddleboards are available for guests. Great for fishing and water sports.",
      image: "https://pixabay.com/photos/lake-house-home-dock-452964/",
      country: "Canada",
      location: "Vancouver, British Columbia",
      price: 500 // per night
    },
    {
      title: "Desert Villa",
      description: "A beautiful villa situated in a desert landscape, featuring a private pool and stunning sunset views. Ideal for those looking for a unique and secluded vacation.",
      country: "UAE",
      location: "Dubai",
      price: 800 // per night
    },
    {
      title: "Mountain Retreat",
      description: "A luxurious mountain retreat with breathtaking views. Enjoy skiing in the winter or hiking in the summer. Includes hot tub and private chef services upon request.",
      image: "https://pixabay.com/photos/chalet-ski-mountain-house-3095334/",
      country: "Switzerland",
      location: "Zermatt",
      price: 950 // per night
    },
    {
      title: "Downtown Studio",
      description: "A compact studio apartment in the downtown area, ideal for business travelers or solo adventurers. Walking distance to cafes, shopping centers, and metro stations.",
      country: "USA",
      location: "Los Angeles, California",
      price: 180 // per night
    },
    {
      title: "Historic Mansion",
      description: "A grand historic mansion with period furnishings and modern comforts. Ideal for history lovers and special events. Guided tours of the mansion available for guests.",
      image: "https://pixabay.com/photos/mansion-castle-house-villa-home-2561984/",
      country: "Italy",
      location: "Tuscany",
      price: 1200 // per night
    },
    {
      title: "City Condo",
      description: "A modern condo with rooftop pool access and gym. Ideal for business travelers and vacationers alike. Located in the heart of the financial district.",
      image: "https://pixabay.com/photos/city-condo-urban-building-apartment-344528/",
      country: "Singapore",
      location: "Downtown Core",
      price: 400 // per night
    },
    {
      title: "Seaside Cottage",
      description: "A charming seaside cottage with rustic interiors and modern comforts. Steps away from the beach, ideal for a relaxing coastal getaway.",
      image: "https://pixabay.com/photos/cottage-seaside-home-sea-view-3089167/",
      country: "Ireland",
      location: "Galway",
      price: 350 // per night
    },
    {
      title: "Rural Villa",
      description: "A private villa surrounded by lush greenery, offering peace and serenity. Perfect for families or small groups seeking a luxurious countryside stay.",
      country: "Spain",
      location: "Mallorca",
      price: 650 // per night
    },
    {
      title: "Chalet",
      description: "A cozy wooden chalet in a snowy mountain village, perfect for a winter getaway. Includes fireplace, sauna, and private ski-in/ski-out access.",
      image: "https://pixabay.com/photos/chalet-house-mountain-village-4881584/",
      country: "Austria",
      location: "Salzburg",
      price: 450 // per night
    },
    {
      title: "Luxury Condo",
      description: "A high-end condo with breathtaking city views and concierge services. Ideal for travelers looking for luxury and convenience in the city.",
      country: "USA",
      location: "San Francisco, California",
      price: 700 // per night
    },
    {
      title: "Cottage",
      description: "A small, picturesque cottage in the countryside, offering cozy interiors and a peaceful atmosphere. Great for weekend escapes.",
      image: "https://pixabay.com/photos/cottage-rural-house-thatched-cottage-67852/",
      country: "Scotland",
      location: "Edinburgh",
      price: 200 // per night
    },
    {
      title: "Tropical Villa",
      description: "A luxurious villa with tropical gardens, private pool, and outdoor dining areas. Perfect for a tropical getaway with friends or family.",
      country: "Thailand",
      location: "Phuket",
      price: 600 // per night
    },
    {
      title: "Skyscraper Penthouse",
      description: "A premium penthouse suite at the top of a skyscraper, offering luxury amenities and stunning views. Private butler services available.",
      image: "https://pixabay.com/photos/skyscraper-penthouse-apartment-3055714/",
      country: "China",
      location: "Shanghai",
      price: 1500 // per night
    },
    {
      title: "Woodland Cabin",
      description: "A secluded woodland cabin perfect for nature lovers. Hiking trails and wildlife watching right outside your door. Ideal for a peaceful retreat.",
      country: "USA",
      location: "Lake Tahoe, California",
      price: 250 // per night
    },
    {
      title: "Urban Townhouse",
      description: "A modern townhouse in the heart of the city, offering spacious living areas and a rooftop terrace. Great for groups or families visiting the city.",
      country: "UK",
      location: "London",
      price: 600 // per night
    },
    {
      title: "Eco-Friendly House",
      description: "A sustainable eco-friendly house with solar panels and rainwater harvesting. Perfect for those who want to vacation sustainably.",
      image: "https://pixabay.com/photos/eco-house-sustainable-green-building-4721248/",
      country: "Netherlands",
      location: "Amsterdam",
      price: 300 // per night
    },
    {
      title: "Luxury Mansion",
      description: "A massive luxury mansion with a private theater, pool, and gym. Perfect for large groups or special events. Butler and chef services available upon request.",
      country: "USA",
      location: "Beverly Hills, California",
      price: 2500 // per night
    },
    {
      title: "Farmhouse",
      description: "A traditional farmhouse with modern touches, situated in a picturesque rural area. Ideal for a quiet countryside retreat with family or friends.",
      image: "https://pixabay.com/photos/farmhouse-rural-landscape-house-457965/",
      country: "New Zealand",
      location: "Wellington",
      price: 350 // per night
    },
    {
      title: "Seaside Penthouse",
      description: "A luxurious penthouse with panoramic views of the ocean. Features a private terrace, jacuzzi, and exclusive beach access. Ideal for a lavish seaside escape.",
      country: "Australia",
      location: "Gold Coast",
      price: 1200 // per night
    },
    {
      title: "Luxury Yurt",
      description: "A unique luxury yurt experience with modern amenities, nestled in the wilderness. Great for eco-friendly travelers looking for a glamping adventure.",
      image: "https://pixabay.com/photos/yurt-nomad-house-traditional-home-3834278/",
      country: "Mongolia",
      location: "Ulaanbaatar",
      price: 150 // per night
    },
    {
      title: "Modern Estate",
      description: "A sprawling modern estate with vast grounds, pool, and entertainment areas. Perfect for hosting events or large gatherings. Private chef and staff available.",
      country: "USA",
      location: "Austin, Texas",
      price: 2000 // per night
    }
  ];
  
  
  
async function dbInIt(){
    // Delete exxisting data
   await listing.deleteMany({});
    
   await listing.insertMany(properties);

   console.log("DB succesfylly init");
};

dbInIt();