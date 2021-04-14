import glob from 'glob';
import fs from 'fs';

import {
    generateTest,
    getComponentName,
    getComponentStories,
    getTestDirectoryPath,
} from './helpers';
import { loadArgs } from './args';
import { loadConfig } from './config';

const run = async () => {
    const args = loadArgs();

    const config = await loadConfig();

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

    glob(storyFilesPath, (err, matches) => {
        if (err) {
            throw err;
        }

        matches.forEach((filePath) => {
            if (!fs.existsSync(filePath)) {
                throw new Error(`File ${filePath} does not exist`);
            }

            const fileData = fs.readFileSync(filePath, 'utf8');
            const componentName = getComponentName(
                fileData,
                componentNamePattern,
            );
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
                    );
                });
            });
        });
    });
};

export { run };
