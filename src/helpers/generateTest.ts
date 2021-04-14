import fs from 'fs';
import path from 'path';

const generateTest = (
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

export { generateTest };
