const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().min(0).required(),

        image: Joi.object({
            url: Joi.string().allow("", null)
        }).optional(),

        geometry: Joi.object({
            lat: Joi.number().required(),
            lng: Joi.number().required()
        }).required()
    }).required()
});

// FIX #9: reviewSchema was missing entirely — required by middleware.js validateReview
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required(),
    }).required()
});