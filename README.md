# Stayvora

A full-stack vacation rental platform where users can discover, list, and review properties from around the world. Built with Node.js, Express, and MongoDB.

---

## Features

- **User Authentication** — Register, log in, and log out securely with Passport.js (local strategy)
- **Listings** — Create, view, edit, and delete property listings with title, description, price, location, and image
- **Image Uploads** — Upload property photos directly to Cloudinary
- **Interactive Maps** — Every listing displays an interactive Leaflet map with an accurate pin; the edit form includes a geocoding search to find and update the pin by location name
- **Reviews** — Authenticated users can leave star ratings and comments on any listing
- **Search** — Filter listings by title, location, or country from the home page
- **Authorization** — Only listing owners can edit or delete their listings; only review authors can delete their reviews
- **Flash Messages** — Success and error feedback on all actions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB + Mongoose 9 |
| Templating | EJS + ejs-mate |
| Authentication | Passport.js (passport-local, passport-local-mongoose) |
| Image Storage | Cloudinary + Multer |
| Maps | Leaflet.js + CartoDB Voyager tiles |
| Geocoding | Nominatim (OpenStreetMap) |
| Validation | Joi |
| Styling | Bootstrap 5 |
| Environment | dotenv |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/stayvora.git
   cd stayvora
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret

   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret
   ```

4. **Run the app**

   ```bash
   node app.js
   ```

   The server starts at `http://localhost:8080`

---

## Project Structure

```
stayvora/
├── controllers/
│   ├── listings.js      # Listing CRUD logic
│   ├── reviews.js       # Review logic
│   └── user.js          # Auth logic
├── models/
│   ├── listing.js       # Listing schema
│   ├── review.js        # Review schema
│   └── user.js          # User schema
├── routes/
│   ├── listing.js       # /listings routes
│   ├── review.js        # /listings/:id/reviews routes
│   └── user.js          # /users routes
├── utils/
│   ├── geocode.js       # Nominatim geocoding helper
│   ├── ExpressError.js  # Custom error class
│   └── wrapAsync.js     # Async error wrapper
├── views/
│   ├── layouts/         # EJS layout
│   ├── includes/        # Navbar, footer, flash
│   └── listings/        # index, new, show, edit views
├── public/
│   └── js/              # Client-side scripts
├── cloudConfig.js       # Cloudinary + Multer config
├── middleware.js        # Auth & ownership middleware
├── schema.js            # Joi validation schemas
└── app.js               # Entry point
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `ATLASDB_URL` | MongoDB connection string |
| `SECRET` | Express session secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_KEY` | Cloudinary API key |
| `CLOUDINARY_SECRET` | Cloudinary API secret |

---

## Routes

| Method | Route | Description |
|---|---|---|
| GET | `/listings` | All listings (with optional search) |
| GET | `/listings/new` | New listing form |
| POST | `/listings` | Create a listing |
| GET | `/listings/:id` | Show a listing |
| GET | `/listings/:id/edit` | Edit listing form |
| PUT | `/listings/:id` | Update a listing |
| DELETE | `/listings/:id` | Delete a listing |
| POST | `/listings/:id/reviews` | Add a review |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review |
| GET | `/users/register` | Register form |
| POST | `/users/register` | Register user |
| GET | `/users/login` | Login form |
| POST | `/users/login` | Log in |
| GET | `/users/logout` | Log out |

---

## Screenshots

> Add screenshots of your home page, listing detail, and map here.

---

## License

This project is open source and available under the [MIT License](LICENSE).
