import type { Config, Schema } from '../types/config';

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
    generateTest: [
        isFunction,
        generateErrorMessage('generateTest', 'a function'),
    ],
    generateFileName: [
        isFunction,
        generateErrorMessage('generateFileName', 'a function'),
    ],

    filesGlob: [isString, generateErrorMessage('filesGlob', 'a string')],
    testDirectory: [
        // eslint-disable-next-line @typescript-eslint/ban-types
        combine<Function | string>(isFunction, isString),
        generateErrorMessage('testDirectory', 'a string or a function'),
    ],
    postfixes: [
        isArray(isString),
        generateErrorMessage('postfixes', 'an array of strings'),
    ],
    strategy: [
        isStrategy,
        generateErrorMessage('strategy', 'one of "component" or "story"'),
    ],

    componentPattern: [
        isRegExp,
        generateErrorMessage('componentPattern', 'a regular expression'),
    ],
    storyPattern: [
        isRegExp,
        generateErrorMessage('storyPattern', 'a regular expression'),
    ],

    validateFileName: [
        combine(isFunction, isOptional),
        generateErrorMessage('validateFileName', 'an optional function'),
    ],
};

export { schema };
