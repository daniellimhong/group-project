const functions = require("./functions")

describe('functions', () => {
    describe("isNumber", () => {
        it('should return valid number', () => {
            expect(functions.isValidNumber(1)).toBe(1)
            expect(functions.isValidNumber(50)).toEqual(50)
            expect(functions.isValidNumber(1000)).toEqual(1000)
            expect(functions.isValidNumber(-19)).toBeFalsy()
        })
    })
})