const mongoose = require('mongoose');
const cities = require('./cities.js');
const { places, descriptors } = require('./seedHelpers.js');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
})

const sample = array => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({})
    console.log(sample(descriptors));
    console.log(sample(places));
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '69fc135048c12266acf0fde5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo error facilis dolore esse! Adipisci, eligendi totam assumenda maiores animi earum blanditiis quo, architecto perspiciatis quis quasi nulla quos nihil provident?",
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dwsunkmyb/image/upload/v1778537002/YelpCamp/eluw1lqj1fapc5zml03y.jpg',
                    filename: 'YelpCamp/eluw1lqj1fapc5zml03y',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})