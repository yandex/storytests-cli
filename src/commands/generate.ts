import { promises as fs } from 'fs';

import { getStoryFiles } from '../utils/get-story-files';
import { generateTestFile } from '../utils/generate-test-file';
import { getComponentName } from '../utils/get-component-name';
import { getComponentStories } from '../utils/get-component-stories';
import { getTestDirectoryPath } from '../utils/get-test-directory-path';

import type { GenerateArgs } from '../types/args';

const generate = async ({ config, rewrite }: GenerateArgs): Promise<void> => {
    const {
        generateFileName,
        componentPattern,
        strategy,
        generateTest,
        storyPattern,
        filesGlob,
        testDirectory,
        postfixes,
    } = config;

    const storyFiles = await getStoryFiles(filesGlob);

    storyFiles.forEach(async (filePath) => {
        const fileData = await fs.readFile(filePath, 'utf8');

        const component = getComponentName(fileData, componentPattern);
        const stories = getComponentStories(fileData, storyPattern);

        const testDirPath = getTestDirectoryPath(
            component,
            filePath,
            testDirectory,
        );

        postfixes.forEach((postfix) => {
            if (strategy === 'component') {
                generateTestFile(
                    testDirPath,
                    generateFileName(component, stories, postfix),
                    component,
                    stories,
                    postfix,
                    generateTest,
                    rewrite,
                );

                return;
            }

            stories.forEach((story) => {
                generateTestFile(
                    testDirPath,
                    generateFileName(component, story, postfix),
                    component,
                    story,
                    postfix,
                    generateTest,
                    rewrite,
                );
            });
        });
    });
};

export { generate };
