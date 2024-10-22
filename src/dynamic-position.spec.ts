/**
 * DynamicPosition uses an internal DynamicVector or DynamicBezier depending on context
 * no need to test full functionality again
 */

testAll();
function testAll(): void {
    describe('DynamicPosition', () => {

        test('dummy', () => { });

        // cannot set duration if position not active
        // cannot set speed if position not active
        // cannot set ease if position not active
        // cannot call moveTo if position not active
        // cannot call moveBy if position not active
        // cannot call curveTo if position not active
        // continues to behave as expected after save and load
        // turn off and on stops and starts update
        // testReturnsExpectedValuesDuringFullUpdateCycleWithNoEaseAndNoControlPoint();
        // returns expected values during full update cycle using moveTo no ease
        // returns expected values during full update cycle using moveTo with ease
        // returns expected values during full update cycle using moveBy
        // returns expected values during full update cycle using curveTo no ease
        // returns expected values during full update cycle using curveTo with ease


    });

}