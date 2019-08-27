const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());
const {SERVER_PORT, SESSION_SECRET} = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 //2 weeks
    }
}))


//Auth endpoints
app.post(`/auth/login`)
app.post(`/auth/register`)
app.get(`/auth/logout`)
app.delete(`/auth/delete_user`)
app.put(`/auth/edit_user`)
app.get(`/auth/edit_user`)

//Listings endpoints
app.post(`listings/create_listing`)
app.put(`/listings/edit_listing`)
app.delete(`/listings/delete_listing`)
app.get(`/listings/get_all_listings`)









app.listen(SERVER_PORT, () => console.log(`listening on server port ${SERVER_PORT}`))