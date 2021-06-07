import path from 'path';

const pathToStory = path.join(__dirname, './story-content.stub.jsx');

const componentNamePattern = /(?<=title: ')[a-z/]+/gi;

const storyNamePattern = /[a-z]+(?= = Template.bind\()/gi;

const testDirectoryPath = '../.generated-tests';

const testFilePostfixes = ['hermione'];

export {
    pathToStory,
    componentNamePattern,
    storyNamePattern,
    testDirectoryPath,
    testFilePostfixes,
};
