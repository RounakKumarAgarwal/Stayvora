class ExpressError extends Error {
    constructor(statusCode, message) {
        super();
        // FIX #10: 'this.statuscode' (lowercase c) → 'this.statusCode' (camelCase)
        // Error handler in app.js destructures 'statusCode' — wrong casing caused fallback to 500 always
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;