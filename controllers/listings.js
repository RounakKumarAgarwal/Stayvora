const Listing = require("../models/listing");
const { listingSchema } = require("../schema.js");
const geocodeLocation = require("../utils/geocode");

module.exports.index = async (req, res) => {
    let filter = {};
    if (req.query.q && req.query.q.trim() !== "") {
        const searchRegex = new RegExp(req.query.q.trim(), "i");
        filter = {
            $or: [
                { title: searchRegex },
                { location: searchRegex },
                { country: searchRegex },
            ],
        };
    }
    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { allListings, searchQuery: req.query.q || "" });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.createListing = async (req, res) => {
    console.log("FULL BODY:");
    console.log(JSON.stringify(req.body, null, 2));
    if (!req.file) {
        req.flash("error", "Please upload an image");
        return res.redirect("/listings/new");
    }

    if (
        !req.body.listing.geometry ||
        !req.body.listing.geometry.lat ||
        !req.body.listing.geometry.lng
    ) {
        req.flash("error", "Please select a location on the map");
        return res.redirect("/listings/new");
    }

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews", populate: {
            path: "author",
        },
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const updateData = { ...req.body.listing };

    // Re-geocode when location/country changes so the map reflects the new address
    const geocoded = await geocodeLocation(updateData.location, updateData.country);
    if (geocoded) {
        updateData.geometry = { lat: geocoded.lat, lng: geocoded.lng };
    }

    // Use { new: true } so we get the updated doc back — otherwise listing.save()
    // below would re-save the pre-update document and overwrite geometry/other fields
    let listing = await Listing.findByIdAndUpdate(id, { $set: updateData }, { new: true });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}