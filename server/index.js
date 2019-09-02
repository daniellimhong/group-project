require("dotenv").config();
const express = require("express");
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
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
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
})

AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

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
const { getAllListings, getUserListings, createNewListing, editListing, deleteListing, getListing } = listingsController;
app.get('/listings/get_all_listings', getAllListings);
app.get('/listings/get_user_listings', getUserListings);
app.get('/listings/get_listing/:id', getListing)
app.post('/listings/create_listing', createNewListing);
app.put('/listings/edit_listing/:id', editListing);
app.delete('/listings/delete_listing/:id', deleteListing);

app.post('/api/file_upload', (request, response) => {
  const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        return response.status(200).send(data);
      } catch (error) {
        console.log(`this is the error`, error)
        return response.status(400).send(error);
      }
    });
});

app.listen(SERVER_PORT, () =>
  console.log(`listening on server port ${SERVER_PORT}`)
);
