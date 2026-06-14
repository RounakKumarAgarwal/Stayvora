const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");

// FIX: DB name changed from 'wanderlust' to 'stayvora' to match app.js intent
const MONGO_URL = "mongodb://127.0.0.1:27017/stayvora";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL)
}

const initDB = async () => {
    await Listing.deleteMany({});
    // NOTE: Replace the owner ObjectId below with a real user _id from your database
    initData.data = initData.data.map((obj) => ({ ...obj, owner: '6a25512eb424945693e2229c' }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();