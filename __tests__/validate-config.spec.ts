import { config as configStub } from '../__mocks__/config.stub';
import { validateConfig } from '../src/config/validate-config';

const validateForValue = (value: unknown) => () => validateConfig(value);

describe('validate-config', () => {
    let config = configStub;

    beforeEach(() => {
        config = { ...configStub };
    });

    test('fails for null', () => {
        expect(validateForValue(null)).toThrowError();
    });

    test('fails for undefined', () => {
        expect(validateForValue(undefined)).toThrowError();
    });

    test('fails for empty object', () => {
        expect(validateForValue({})).toThrowError();
    });

    test('fails when "generateTest" is not a function', () => {
        config['generateTest'] = '';
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "generateFileName" is not a function', () => {
        config['generateFileName'] = '';
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "filesGlob" is not a string', () => {
        config['filesGlob'] = 1;
        expect(validateForValue(config)).toThrowError();
    });

    test('doesnt fail when "testDirectory" is a function', () => {
        config['testDirectory'] = () => {};
        expect(validateConfig(config)).toBe(true);
    });

    test('fails when "testDirectory" is not a string or a function', () => {
        config['testDirectory'] = 1;
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "postfixes" is not an array of string', () => {
        config['postfixes'] = '';
        expect(validateForValue(config)).toThrowError();

        config['postfixes'] = [];
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "strategy" is not one of "component" or "story"', () => {
        config['strategy'] = '';
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "componentPattern" is not a regular expression', () => {
        config['componentPattern'] = '';
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "storyPattern" is not a regular expression', () => {
        config['storyPattern'] = '';
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when a required field is missing', () => {
        delete config['storyPattern'];
        expect(validateForValue(config)).toThrowError();
    });

    test('doesnt fail when an optional field is missing', () => {
        delete config['validateFileName'];
        expect(validateConfig(config)).toBe(true);
    });

    test('fails when excess fields are provided and enumerates them', () => {
        config['excessField1'] = 1;
        config['excessField2'] = 2;
        expect(validateForValue(config)).toThrowError(
            /(?=.*excessField1)(?=.*excessField2)/,
        );
    });

    test('validates stub config', () => {
        expect(validateConfig(config)).toBe(true);
    });
});
