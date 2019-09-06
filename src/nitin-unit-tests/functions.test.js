const functions = require('../nitin-unit-tests/functions')

describe('getRandomListing', ()=> {
    it('create a random index number', () => {
        expect(functions.getRandomListing([1,2,3,4,5,6,7,8])).toBeLessThan(8)
    })
})