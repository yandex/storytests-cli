import { promises as fs } from 'fs';

import { loadConfig } from 'config/config';

import { generateTest } from 'utils/generate-test';
import { getStoryFiles } from 'utils/get-story-files';
import { getComponentName } from 'utils/get-component-name';
import { getComponentStories } from 'utils/get-component-stories';
import { getTestDirectoryPath } from 'utils/get-test-directory-path';

import type { GenerateArgs } from 'types/args';

const generate = async ({
    config: configPath,
    rewrite,
}: GenerateArgs): Promise<void> => {
    const config = await loadConfig(configPath);

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
                    generateFileName(componentName, postfix),
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
                    generateFileName(story, postfix),
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
