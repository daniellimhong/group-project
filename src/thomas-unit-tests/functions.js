module.exports = {
    searchFunction(arr, filterinput) {
        
        let currentListings = this.state.listings;
        let filteredListings = this.state.filteredListings;
    
        filteredListings = currentListings.filter(search => {
          //   console.log("search", search)
          return search.car.make === this.state.searchByMake;
        });
    
        this.setState({
          filtered: filteredListings
        });
        this.props.callbackFromParent(filteredListings);
      },
      testFunc(currentUser, index, objToSet){
        currentUser.listings[index] = objToSet
        return objToSet
      }
}