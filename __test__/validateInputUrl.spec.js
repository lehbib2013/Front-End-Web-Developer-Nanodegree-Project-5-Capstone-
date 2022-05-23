
// Import the js file to test
import { isValidURL } from "../src/client/js/validateInputUrl"
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the validation functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the validateInputUrl() function", () => {
        // call function with wrong parameter value to expect error result
        const data = isValidURL('hhh://jkj');
        console.log(data);
        // assert  the false value returned by this function because url  argument is not valid url
        expect(data).toEqual(false);

    })
});