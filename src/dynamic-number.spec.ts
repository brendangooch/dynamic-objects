/**
 * 
 */

testAll();
function testAll(): void {
    describe('DynamicNumber', () => {

        test('dummy', () => { });

        // public get isActive(): boolean
        // starts inactive
        // does not become active once duration is set
        // does not become active once speed is set
        // becomes active once valid duration is set and changeTo() is called
        // becomes active once valid duration is set and changeBy() is called
        // becomes active once valid speed is set and changeTo() is called
        // becomes active once valid speed is set and changeBy() is called
        // becomes inactive once duration has elapsed
        // can be active whether on or off


        // public get current(): number
        // initial current value is 0 if not set in the constructor
        // initial current value is value set in constuctor
        // current is the same value whether unit is on or off


        // public setDuration(ms: number): DynamicNumber
        // duration can only be set if not active
        // duration must be greater than 0 to have an effect


        // public setSpeed(units: number): DynamicNumber
        // speed can only be set if not active
        // speed must be greater than 0 to have an effect
        // speed is in units per second


        // public setEase(easeOption: tEaseOption): DynamicUnit
        // ease can only be set if not active


        // public changeTo(n: number): boolean
        // number can only be changed if not active
        // does nothing if set to current value
        // if duration is not set, changes current value immediately
        // if duration is set, makes number active and changes value dynamically over time


        // public changeBy(n: number): boolean
        // number can only be changed if not active
        // does nothing if n is 0
        // if duration is not set, changes current value immediately
        // if duration is set, makes number active and changes value dynamically over time
        // changes number by correct amount immediately
        // changes number by correct amount dynamically over time
        // can be a negative value


        // public turnOn(): void
        // public turnOff(): void
        // turning off and on stops and starts update


        // public update(ms: number): void
        // does not update if not active
        // does not update if turned off
        // updates if active and turned on (if duration set, change method called, having been inactive)


        // public load(json: string): boolean
        // public save(): string
        // can be saved whether turned on or off
        // behaves the same after save and load
        // load returns true on valid load
        // load returns false if "" property missing
        // load returns false if "" property missing
        // load returns false if "" property missing
        // load returns false if "" property missing
        // load returns false if "" property missing
        // load returns false if "isOn" property missing


        // returns expected current value during full duration
        // returns expected current value during full duration when speed is set
        // returns expected current value during full duration with ease applied
        // works with number 0 - 1
        // works with positive to higher numbers
        // works with positive to lower numbers
        // works with negative to higher numbers
        // works with negative to lower numbers

    });

}