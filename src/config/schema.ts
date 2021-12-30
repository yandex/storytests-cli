import type { Config } from 'src/types/config';

const isRegExp = (value: unknown): value is RegExp => value instanceof RegExp;

// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = (value: unknown): value is Function =>
    typeof value === 'function';

const isString = (value: unknown): value is string => typeof value === 'string';

const isArray = <T>(isType: (value: unknown) => value is T) => {
    return (value: unknown): value is Array<T> =>
        Array.isArray(value) && value.length > 0 && value.every(isType);
};

const isStrategy = (value: unknown): value is 'story' | 'component' =>
    value === 'story' || value === 'component';

const generateErrorMessage = (key: string, expected: string) =>
    `Config key ${key} must be ${expected}`;

const schema: Record<keyof Config, [(_: unknown) => boolean, string]> = {
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
        generateErrorMessage('componentNamePattern', 'a regular expression'),
    ],
};

export { schema };
