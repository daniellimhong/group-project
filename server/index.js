require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const {
  login,
  register,
  logout,
  userSession,
  editProfile,
  deleteProfile
} = require("./Controller/AuthController");
const app = express();
app.use(express.json());
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 //2 weeks
    }
  })
);

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection successful')
});


//Auth endpoints
app.post('/auth/login', login);
app.post('/auth/register', register);
app.get('/auth/logout', logout);
app.delete('/auth/delete_user/:id', deleteProfile);
app.put('/auth/edit_user/:id', editProfile);
app.get('/auth/session', userSession);

//Listings endpoints
const listingsController = require('./Controller/ListingsController')
const { getAllListings, getUserListings, createNewListing, editListing, deleteListing } = listingsController;
app.get('/listings/get_all_listings', getAllListings);
app.get('/listings/get_user_listings', getUserListings);
app.post('/listings/create_listing', createNewListing);
app.put('/listings/edit_listing/:id', editListing);
app.delete('/listings/delete_listing/:id', deleteListing);

app.listen(SERVER_PORT, () =>
  console.log(`listening on server port ${SERVER_PORT}`)
);
