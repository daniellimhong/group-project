const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 //2 weeks
    }
}));

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection successful')
});


//Auth endpoints
const authController = require("./Controller/AuthController");
const { login } = authController;
app.post('/auth/login', login);
app.post('/auth/register');
app.get(`/auth/logout`);
app.delete(`/auth/delete_user`);
app.put(`/auth/edit_user`);
app.get(`/auth/edit_user`);

//Listings endpoints
const listingsController = require('./Controller/ListingsController')
const { getAllListings, createNewListing, editListing } = listingsController;
app.post('/listings/create_listing', createNewListing);
app.put('/listings/edit_listing', editListing);
app.delete('/listings/delete_listing');
app.get('/listings/get_all_listings', getAllListings);
app.get('/listings/get_user_listings')









app.listen(SERVER_PORT, () => console.log(`listening on server port ${SERVER_PORT}`))