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

    test('fails when "testTemplate" is not a function', () => {
        config['testTemplate'] = '';
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "generateFileName" is not a function', () => {
        config['generateFileName'] = '';
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "storyFilesPath" is not a string', () => {
        config['storyFilesPath'] = 1;
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "relativeTestDirectoryPath" is not a string', () => {
        config['relativeTestDirectoryPath'] = 1;
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "testFilePostfixes" is not an array of string', () => {
        config['testFilePostfixes'] = '';
        expect(validateForValue(config)).toThrowError();

        config['testFilePostfixes'] = [];
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "testGenerationStrategy" is not one of "component" or "story"', () => {
        config['testGenerationStrategy'] = '';
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "componentNamePattern" is not a regular expression', () => {
        config['componentNamePattern'] = '';
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when "storyNamePattern" is not a regular expression', () => {
        config['storyNamePattern'] = '';
        expect(validateForValue(config)).toThrowError();
    });

    test('fails when a field is missing', () => {
        delete config['storyNamePattern'];
        expect(validateForValue(config)).toThrowError(/storyNamePattern/);
    });

    test('fails when a excess fields are provided and enumerates them', () => {
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
