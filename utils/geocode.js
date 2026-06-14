// const axios = require("axios");

// async function geocodeLocation(location, country) {
//   const query = encodeURIComponent(`${location}, ${country}`);
//   const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

//   try {
//     const response = await axios.get(url, {
//       headers: {
//         // REQUIRED: Replace with your actual email address
//         "User-Agent": "Stayvora/1.0 (agarwalrounak2005@gmail.com)",
//         "Accept-Language": "en",
//         "Referer": "http://localhost:8080",
//       },
//       timeout: 10000, // 10 second timeout
//     });

//     if (!response.data || !response.data.length) {
//       console.log("No geocoding result for:", location, country);
//       return null;
//     }

//     return {
//       lat: parseFloat(response.data[0].lat),
//       lng: parseFloat(response.data[0].lon),
//     };
//   } catch (err) {
//     if (err.response) {
//       console.error(`Geocoding failed [HTTP ${err.response.status}]:`, location);
//     } else if (err.code === "ECONNABORTED") {
//       console.error("Geocoding timed out for:", location);
//     } else {
//       console.error("Geocoding error:", err.message);
//     }
//     return null;
//   }
// }

// module.exports = geocodeLocation;

const axios = require("axios");

async function geocodeLocation(location, country) {
  const query = encodeURIComponent(`${location}, ${country}`);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

  try {
    const response = await axios.get(url, {
      headers: {
        // REQUIRED: Replace with your actual email address
        "User-Agent": "Stayvora/1.0 (agarwalrounak2005@gmail.com)",
        "Accept-Language": "en",
        "Referer": "http://localhost:8080",
      },
      timeout: 10000, // 10 second timeout
    });

    if (!response.data || !response.data.length) {
      console.log("No geocoding result for:", location, country);
      return null;
    }

    return {
      lat: parseFloat(response.data[0].lat),
      lng: parseFloat(response.data[0].lon),
    };
  } catch (err) {
    if (err.response) {
      console.error(`Geocoding failed [HTTP ${err.response.status}]:`, location);
    } else if (err.code === "ECONNABORTED") {
      console.error("Geocoding timed out for:", location);
    } else {
      console.error("Geocoding error:", err.message);
    }
    return null;
  }
}

module.exports = geocodeLocation;