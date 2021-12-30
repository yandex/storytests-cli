import { promises as fs } from 'fs';
import path from 'path';

import * as utilsMocks from '../__mocks__/utils.mock';
import * as utilsStubs from '../__mocks__/utils.stub';

jest.mock('glob', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../src/utils/fs-exists', () => ({
    __esModule: true,
    fsExists: jest.fn(),
}));

import * as globModule from 'glob';
import * as fsExistsModule from '../src/utils/fs-exists';

import { generateTestFile } from '../src/utils/generate-test-file';
import { getComponentName } from '../src/utils/get-component-name';
import { getComponentStories } from '../src/utils/get-component-stories';
import { getTestDirectoryPath } from '../src/utils/get-test-directory-path';

const { testTemplateMock } = utilsMocks;

const {
    componentNamePattern,
    pathToStory,
    storyNamePattern,
    testDirectoryPath,
    testFilePostfixes,
} = utilsStubs;

describe('utils', () => {
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
        test('should return path to generated test directory if it is a relative path', () => {
            expect(
                getTestDirectoryPath('', pathToStory, testDirectoryPath),
            ).toEqual(pathToGeneratedTestDirectory);
        });

        test('should return value from function if a function is passed', () => {
            expect(getTestDirectoryPath('', pathToStory, () => 'path')).toEqual(
                'path',
            );
        });

        test('should return testDirectory value if it is an absolute path', () => {
            expect(
                getTestDirectoryPath('', pathToStory, '/users/Admin/smth'),
            ).toEqual('/users/Admin/smth');
        });
    });

    describe('getStoryFiles', () => {
        jest.spyOn(globModule, 'default')
            // @ts-expect-error return value is unused
            .mockImplementation((path, callback) => {
                // @ts-expect-error function overload with callback is used
                callback(null, [path, path, path]);
                return {};
            });

        test('should return matched story file paths', () => {
            expect(
                getTestDirectoryPath('', pathToStory, testDirectoryPath),
            ).toEqual(pathToGeneratedTestDirectory);
        });
    });

    describe('generateTestFile', () => {
        const componentName = 'Components/RoundedButton';
        const componentStoryNames = ['SecondaryWithLongLabel'];
        const filename = 'rounded-button.hermione.js';
        const postfix = testFilePostfixes[0];

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

            await generateTestFile(
                getTestDirectoryPath(
                    componentName,
                    pathToStory,
                    testDirectoryPath,
                ),
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

            await generateTestFile(
                getTestDirectoryPath(
                    componentName,
                    pathToStory,
                    testDirectoryPath,
                ),
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

            await generateTestFile(
                getTestDirectoryPath(
                    componentName,
                    pathToStory,
                    testDirectoryPath,
                ),
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

            await generateTestFile(
                getTestDirectoryPath(
                    componentName,
                    pathToStory,
                    testDirectoryPath,
                ),
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
