import { promises as fs } from 'fs';

import { loadConfig } from 'src/config/config';
import { generateTest } from 'src/helpers/generate-test';
import { getStoryFiles } from 'src/helpers/get-story-files';
import { getComponentName } from 'src/helpers/get-component-name';
import { getComponentStories } from 'src/helpers/get-component-stories';
import { getTestDirectoryPath } from 'src/helpers/get-test-directory-path';

import type { TGenerateArgs } from 'src/types/args';

const generate = async ({
    config: configPath,
    rewrite,
}: TGenerateArgs): Promise<void> => {
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
