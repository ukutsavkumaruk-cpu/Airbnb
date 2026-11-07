# Staybnb

A Node.js and Express accommodation-listing application. Users can browse
properties, create an account, save favourites, and—when logged in—manage
property listings.

## Features

- Browse property listings and view property details.
- Register and log in with an email address and password.
- Store passwords as bcrypt hashes.
- Maintain login sessions in MongoDB.
- Add and remove properties from a user's favourites.
- Create, edit, and delete property listings behind login-protected host routes.
- Upload property images and PDF house rules.
- Render pages using EJS templates and style them with Tailwind CSS.

## Requirements

- Node.js and npm
- A MongoDB database (local or hosted)

## Getting started

1. Install the project dependencies:

   ```sh
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   DB_URL=mongodb://127.0.0.1:27017/staybnb
   SESSION_SECRET=replace-this-with-a-long-random-secret
   PORT=3000
   ```

   `DB_URL` must point to a MongoDB database accessible to the application.
   Keep `.env` private; it is excluded from Git.

3. Ensure the `uploads` directory exists in the project root. Uploaded listing
   images and PDF house rules are stored there.

4. Start the application:

   ```sh
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) (or the port configured
   in `PORT`).

### Development

Run the app with Nodemon and rebuild/watch the Tailwind CSS output:

```sh
npm run dev
```

The application listens on `PORT`, or port `3000` when `PORT` is not set.
Session cookies use HTTPS-only mode when `NODE_ENV=production`; on local
development HTTP they are not marked secure.

## Routes

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/` | Browse properties |
| GET | `/store/home-detail/:homeID` | View a property |
| GET | `/store/bookings` | View the bookings page |
| GET | `/store/favourite-list` | View the logged-in user's favourites |
| POST | `/store/favourite-list` | Add a property to favourites |
| POST | `/store/favourite-list/delete` | Remove a property from favourites |
| GET | `/login` | Show the login page |
| POST | `/login` | Log in |
| POST | `/logout` | Log out |
| GET | `/signUp` | Show the registration page |
| POST | `/signUp` | Create an account |
| GET | `/rules/:fileName` | View house rules (login required) |
| GET | `/host/add-Home` | Show the add-property form (login required) |
| POST | `/host/add-Home` | Create a property (login required) |
| GET | `/host/host-home-list` | Manage property listings (login required) |
| GET | `/host/edit-Home/:homeId` | Show the edit-property form (login required) |
| POST | `/host/edit-Home/:homeId` | Update a property (login required) |
| GET | `/host/host-home-list/:homeId` | Delete a property (login required) |

## Project structure

```text
.
├── app.js                 # Express app, middleware, sessions, and startup
├── controllers/           # Request handlers
├── model/                 # Mongoose models (User and home)
├── routes/                # Authentication, store, and host routes
├── uploads/               # Uploaded property images and rule PDFs
├── util/                  # Shared utilities
├── views/                 # EJS page templates and Tailwind input CSS
├── public/                # Static assets and generated CSS
└── .env                   # Local environment variables (not committed)
```

## Data and uploads

- MongoDB stores user accounts, property listings, and login sessions.
- The `User` model stores `userName` (the registration form's email field),
  a bcrypt-hashed password, the user's type, and favourite property references.
- The `home` model stores listing details and uploaded file names.
- Uploads accept JPEG/PNG images and PDF files through the configured upload
  fields `image` and `homeRules`.

## Troubleshooting

### MongoDB connection errors

Check that MongoDB is running and that `DB_URL` is correct and reachable. The
application starts its HTTP server only after the database connection succeeds.

### Login does not persist on local HTTP

In production, the session cookie is marked secure and therefore requires
HTTPS. For local development, do not set `NODE_ENV=production` when using
`http://localhost`; otherwise the browser will not send the session cookie over
HTTP.

### MongoDB/BSON version errors

If you see an error such as `Unsupported BSON version`, check compatibility
between Mongoose and `connect-mongodb-session`. This project uses Mongoose 8
with `connect-mongodb-session` 5.

## Tests

The `test` script is currently a placeholder; no automated test suite is
configured yet.

## Challenges

1. ### Problem
While testing the login functionality locally, I noticed that the session cookie was not being set or sent properly by the browser.

### Root Cause
The cookie was configured with `secure: true`, which means the browser only sends the cookie over HTTPS connections.

However, my local development server was running on HTTP (`http://localhost:3000`), so the browser did not send the secure cookie.

### Solution
I updated the cookie configuration to make it environment-dependent:

```javascript
cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
}
```

Now:
- In development, `secure` becomes `false`, allowing cookies over local HTTP.
- In production, `secure` becomes `true`, ensuring cookies are sent only over HTTPS.

### Learning
I learned how the `secure` cookie attribute works and why cookie configurations need to differ between local development and production environments.

2. ### Problem
While working with MongoDB, I encountered the following error:

`Unsupported BSON version, bson types must be from bson 6.x.x`

### Root Cause
The error occurred because different MongoDB-related packages were using incompatible BSON versions.

In my project:
- Mongoose 9 uses MongoDB driver 7 and BSON 7.
- connect-mongodb-session@5 uses MongoDB driver 6 and BSON 6.

Due to this version mismatch, BSON objects created by one package were incompatible with the other package.

### Solution
I resolved the compatibility issue by using Mongoose 8, which is compatible with the MongoDB driver and BSON version required by connect-mongodb-session@5.

### Learning
I learned:

- How packages depend on other packages.
- Why dependency version compatibility matters.
- How incompatible versions can cause runtime errors.
- Why checking package dependencies is important in backend development.