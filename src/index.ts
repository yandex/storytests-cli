import { promises as fs } from 'fs';

import {
    generateTest,
    getStoryFiles,
    getComponentName,
    getComponentStories,
    getTestDirectoryPath,
} from './helpers';
import { loadArgs } from './args';
import { loadConfig } from './config';

const run = async () => {
    const { config: configPath, rewrite } = loadArgs();

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

export { run };
