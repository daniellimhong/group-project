# DevCarHub

## Client
### Dependencies 
- axios
- react-router-dom (BrowserRouter)
- redux
- react-redux
- node-sass 
- redux-promise-middleware
- http-proxy-middleware

### Routes
- Home (Landing Page/Log-in) 
    - home => / => Login.js
- Search Car
- Signup/register
- Sell Car
- For Sale
- Your Listing/Edit Listing
- Contact Seller
- Profile/Edit Profile
    - profile => /profile => Profile.js

### File-structure
- src/
    - components
        - profile   
            - \
        - Home   
            - Home.js
            - Home.scss
        - NavBar
        - SearchBar
        - Featured
        - Sign Up (register)
        - Login 
        - Listings
        - SellCar
        - ForSale
        - YourListing
        - EditListing
        - Contact
        - EditProfile
    - redux
        - store.js
        - reducer.js
    - App.js (Routes)
    - Index.css + Reset.css
    - setupProxy.js 
        
***

## Server
### Dependencies 
- express
- mongoose
- dotenv
- express-session
- bcrypt
- Amazon S3

### Server file structure
- server/ 
    - index.js
    - middleware
        -middleware.js
    - controller      
        - authController
        - userController
        - listingsController
    - collections 
        - users.js
        - listings.js
***

### ENDPOINTS

**Authorization Controller**
- login: => /api/login
- register: => /api/register - (a.k.a newUser)
- logout: => /api/logout
- userSession: => /api/user_session

**User Controller**
- editUser: => /api/edit_user
- deleteUser: => /api/delete_user

**Listings Controller**
- newListing: => /api/new_listing
- editListing: => /api/edit_listing
- deleteListing: => /api/delete_listing
- getAllListings: => /api/get_all_listings 

***
## Database - MongoDB
Users Schema:
- User ID 
- Username
- Password
- Email

Listings: 
- Listing ID
- Make
- Model
- Price
- Zip Code
- Picture
- Mileage
- Trim



## Notes
- All of us work on controllers/collections for Mongo experience
- Roles
    - Nitin:
    - Thomas:
    - Daniel: 
- Workflow
