// References:
// https://webapplog.com/tdd/
// https://www.sitepoint.com/unit-test-javascript-mocha-chai/

/*
npm install mocha --save
npm install chai --save
*/

var assert = require('assert');

//describe() is simply a way to group our tests in Mocha.
describe('Tests', function() {
    describe('WithoutBefore', function() {
        it('should return -1 when the value is not present', function(){
        assert.equal(-1, [1,2,3].indexOf(4));
        });
        it('should test if 3*3 = 9', function(){
            assert.equal(9, 3*3);
        });
        it('should test if (3-4)*8 = -8', function(){
            assert.equal(-8, (3-4)*8);
        });
        it('should return an array', function(){
            assert(Array.isArray('a,b,c'.split(',')))
        }); 
        it('should return the same array', function(){
            assert.equal(['a','b','c'].length, 'a,b,c'.split(',').length, 'arrays have equal length');

            for (var i=0; i<['a','b','c'].length; i++) {
                assert.equal(['a','b','c'][i], 'a,b,c'.split(',')[i], i +'element is equal');
            };
        });
    });

    var expected, current;
    before(function(){
      expected = ['a', 'b', 'c'];
    })
    describe('WithBefore', function(){

        beforeEach(function(){
            current = 'a,b,c'.split(',');
        })
        it('should return an array', function(){
            assert(Array.isArray(current));
        });
        it('should return the same array', function(){
            assert.equal(expected.length, current.length, 'arrays have equal length');
            
            for (var i=0; i<expected.length; i++) {
                assert.equal(expected[i], current[i], i + 'element is equal');
            }
        })
    })


});






