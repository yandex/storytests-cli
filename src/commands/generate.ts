import { promises as fs } from 'fs';

import { generateTest } from '../utils/generate-test';
import { getStoryFiles } from '../utils/get-story-files';
import { getComponentName } from '../utils/get-component-name';
import { getComponentStories } from '../utils/get-component-stories';
import { getTestDirectoryPath } from '../utils/get-test-directory-path';

import type { GenerateArgs } from '../types/args';

const generate = async ({ config, rewrite }: GenerateArgs): Promise<void> => {
    const {
        generateFileName,
        componentNamePattern,
        testGenerationStrategy,
        testTemplate,
        storyNamePattern,
        storyFilesPath,
        relativeTestDirectoryPath,
        testFilePostfixes,
    } = config;

    const storyFiles = await getStoryFiles(storyFilesPath);

    storyFiles.forEach(async (filePath) => {
        const fileData = await fs.readFile(filePath, 'utf8');

        const componentName = getComponentName(fileData, componentNamePattern);
        const componentStories = getComponentStories(
            fileData,
            storyNamePattern,
        );

        const testDirectory = getTestDirectoryPath(
            filePath,
            relativeTestDirectoryPath,
        );

        testFilePostfixes.forEach((postfix) => {
            if (testGenerationStrategy === 'component') {
                generateTest(
                    testDirectory,
                    generateFileName(componentName, componentStories, postfix),
                    componentName,
                    componentStories,
                    postfix,
                    testTemplate,
                    rewrite,
                );

                return;
            }

            componentStories.forEach((story) => {
                generateTest(
                    testDirectory,
                    generateFileName(componentName, story, postfix),
                    componentName,
                    story,
                    postfix,
                    testTemplate,
                    rewrite,
                );
            });
        });
    });
};

export { generate };
