import { promises as fs } from 'fs';
import path from 'path';

import * as helpers from '../src/helpers';
import * as helpersMocks from '../__mocks__/helpers.mock';
import * as helpersStubs from '../__mocks__/helpers.stub';

import * as fsExistsModule from '../src/helpers/fsExists';

const {
    generateTest,
    getComponentName,
    getComponentStories,
    getTestDirectoryPath,
} = helpers;

const { testTemplateMock } = helpersMocks;

const {
    componentNamePattern,
    pathToStory,
    storyNamePattern,
    testDirectoryPath,
    testFilePostfixes,
} = helpersStubs;

describe('helpers', () => {
    let fileContent: string;
    const pathToGeneratedTestDirectory = path.resolve(
        __dirname,
        '../.generated-tests/',
    );

    beforeEach(async () => {
        fileContent = await fs.readFile(pathToStory, 'utf8');
    });

    describe('getComponentName', () => {
        test('should return matched component name unchanged', () => {
            expect(getComponentName(fileContent, componentNamePattern)).toEqual(
                'Components/RoundedButton',
            );
        });

        test('should throw an error if no match is found', () => {
            expect(() =>
                getComponentName(fileContent, /(?<=title: ")[a-z]+/gi),
            ).toThrowError();
        });
    });

    describe('getComponentStories', () => {
        test('should return matched stories names unchanged', () => {
            expect(getComponentStories(fileContent, storyNamePattern)).toEqual([
                'Primary',
                'Secondary',
                'SecondaryWithLongLabel',
            ]);
        });

        test('should return an empty array if not stories are found', () => {
            expect(
                getComponentStories(fileContent, /[a-z ]+(?=", \(\) => )/gi),
            ).toEqual([]);
        });
    });

    describe('getTestDirectoryPath', () => {
        test('should return path to generated test directory', () => {
            expect(
                getTestDirectoryPath(pathToStory, testDirectoryPath),
            ).toEqual(pathToGeneratedTestDirectory);
        });
    });

    describe('generateTest', () => {
        const componentName = 'Components/RoundedButton';
        const componentStoryNames = ['SecondaryWithLongLabel'];
        const filename = 'rounded-button.hermione.js';
        const postfix = testFilePostfixes[0];

        jest.mock('../src/helpers/fsExists', () => ({
            fsExists: jest.fn(),
        }));

        const fsExistsSpy = jest.spyOn(fsExistsModule, 'fsExists');
        const writeFileSpy = jest
            .spyOn(fs, 'writeFile')
            .mockImplementation(() => new Promise((resolve) => resolve()));

        afterAll(() => {
            fsExistsSpy.mockRestore();
            writeFileSpy.mockRestore();
        });

        test('should generate test file if none exists', async () => {
            fsExistsSpy.mockImplementation(
                () => new Promise((resolve) => resolve(false)),
            );

            await generateTest(
                getTestDirectoryPath(pathToStory, testDirectoryPath),
                filename,
                componentName,
                componentStoryNames,
                postfix,
                testTemplateMock,
            );

            expect(fsExistsSpy).toHaveBeenCalled();
            expect(writeFileSpy).toHaveBeenCalled();
        });

        test('should not generate test file if one already exists', async () => {
            fsExistsSpy.mockImplementation(
                () => new Promise((resolve) => resolve(true)),
            );

            await generateTest(
                getTestDirectoryPath(pathToStory, testDirectoryPath),
                filename,
                componentName,
                componentStoryNames,
                postfix,
                testTemplateMock,
            );

            expect(fsExistsSpy).toHaveBeenCalled();
            expect(writeFileSpy).not.toHaveBeenCalled();
        });

        test('should generate test file if one already exists but rewrite is true', async () => {
            fsExistsSpy.mockImplementation(
                () => new Promise((resolve) => resolve(true)),
            );

            await generateTest(
                getTestDirectoryPath(pathToStory, testDirectoryPath),
                filename,
                componentName,
                componentStoryNames,
                postfix,
                testTemplateMock,
                true,
            );

            expect(fsExistsSpy).toHaveBeenCalled();
            expect(writeFileSpy).toHaveBeenCalled();
        });

        test('should not generate test file if testTemplate returns false', async () => {
            fsExistsSpy.mockImplementation(
                () => new Promise((resolve) => resolve(false)),
            );

            await generateTest(
                getTestDirectoryPath(pathToStory, testDirectoryPath),
                filename,
                componentName,
                componentStoryNames,
                postfix,
                () => false,
            );

            expect(fsExistsSpy).toHaveBeenCalled();
            expect(writeFileSpy).not.toHaveBeenCalled();
        });
    });
});
