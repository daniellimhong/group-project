module.exports = {
    getRandomListing: (listingsArr)=>{

        const randomNumber = Math.floor(Math.random() * listingsArr.length
      )
      return randomNumber;
    }
}