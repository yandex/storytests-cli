import fs from 'fs';
import path from 'path';

export const getComponentName = (
    fileContent: string,
    pattern: RegExp | string,
): string => {
    const matches = fileContent.match(pattern);

    if (matches === null) {
        throw new Error(
            "Couldn't find component name, check componentNamePattern",
        );
    }

    return matches[0];
};

export const getComponentStoriesNames = (
    fileContent: string,
    pattern: RegExp | string,
): string[] => {
    const matches = fileContent.match(pattern);

    return matches === null ? [] : matches;
};

export const getTestDirectoryPath = (
    pathToStory: string,
    relatedPathToTestDirectory: string,
): string => path.resolve(pathToStory, relatedPathToTestDirectory);

export const generateTest = (
    testDirectoryPath: string,
    filename: string,
    componentName: string,
    componentStoryNames: string | string[],
    postfix: string,
    testTemplate: (
        component: string,
        stories: string | string[],
        postfix: string,
    ) => string | false,
    rewrite = false,
): void => {
    const testPath = path.resolve(testDirectoryPath, filename);

    if (!rewrite && fs.existsSync(testPath)) {
        return;
    }

    const content = testTemplate(componentName, componentStoryNames, postfix);

    if (content === false) {
        return;
    }

    if (!fs.existsSync(testDirectoryPath)) {
        fs.mkdirSync(testDirectoryPath, { recursive: true });
    }

    fs.writeFileSync(testPath, content, 'utf8');
};
