import type { Config, Schema } from 'types/config';
import {
    combine,
    isArray,
    isFunction,
    isOptional,
    isRegExp,
    isStrategy,
    isString,
} from './validators';

const generateErrorMessage = (key: string, expected: string) =>
    `Config key ${key} must be ${expected}`;

const schema: Schema<Config> = {
    testTemplate: [
        isFunction,
        generateErrorMessage('testTemplate', 'a function'),
    ],
    generateFileName: [
        isFunction,
        generateErrorMessage('generateFileName', 'a function'),
    ],

    storyFilesPath: [
        isString,
        generateErrorMessage('storyFilesPath', 'a string'),
    ],
    relativeTestDirectoryPath: [
        isString,
        generateErrorMessage('relativeTestDirectoryPath', 'a string'),
    ],
    testFilePostfixes: [
        isArray(isString),
        generateErrorMessage('testFilesPostfixes', 'an array of strings'),
    ],
    testGenerationStrategy: [
        isStrategy,
        generateErrorMessage(
            'testGenerationStrategy',
            'one of "component" or "story"',
        ),
    ],

    componentNamePattern: [
        isRegExp,
        generateErrorMessage('componentNamePattern', 'a regular expression'),
    ],
    storyNamePattern: [
        isRegExp,
        generateErrorMessage('storyNamePattern', 'a regular expression'),
    ],

    validateFileName: [
        combine(isFunction, isOptional),
        generateErrorMessage('validateFileName', 'a function'),
    ],
};

export { schema };
