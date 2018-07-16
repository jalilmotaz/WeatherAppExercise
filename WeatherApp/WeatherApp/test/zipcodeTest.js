
var chai = require('chai');
var assert = chai.assert;
describe('Zipcode', function () {
    
    it('should be 5 numbers', function () {
        var zipcode = "12345";
        assert.equal(zipcode.toString().length, 5);
    });

    it('should be 5 numbers or 5 numbers followed by a dash and 4 numbers', function () {

        var zipcode = "19149-1311";
        var usaZipCodeRegex = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;

        assert.equal(usaZipCodeRegex.test(zipcode), true)
    });


});