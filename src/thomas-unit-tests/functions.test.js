const utils = require('./functions');

it("should check if listing is correct", () => {
    expect(
        utils.testFunc(
            {listings: [{car: "mazda3", price: 17000, zip: 95046}]},
            0,
            {car: "mazda3", price: 17000, zip: 95046}
        )).toMatchObject({car: "mazda3", price: 17000, zip: 95046})
})

