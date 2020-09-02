import { Checker } from './../../utils/checker.util';

describe('[Chcker][Util]', () => {
    test('[isArgsEmpty] with single arg ...', () => {
        const testArg = '';
        const testArg2 = 'test';

        expect(Checker.isArgsEmpty(testArg)).toEqual(true);
        expect(Checker.isArgsEmpty(testArg2)).toEqual(false);
    });

    test('[isArgsEmpty] with multiple arg ...', () => {
        const testArg = ['', 'Test'];
        const testArg2 = ['test'];

        expect(Checker.isArgsEmpty(testArg)).toEqual(true);
        expect(Checker.isArgsEmpty(testArg2)).toEqual(false);
    });
});