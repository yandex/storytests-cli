import { Config } from '../types/config';

const getValidFilenames = (
    component: string,
    stories: string[],
    postfixes: string[],
    strategy: Config['testGenerationStrategy'],
    generateFileName: Config['generateFileName'],
): string[] => {
    if (strategy === 'component') {
        return postfixes.map((postfix) =>
            generateFileName(component, stories, postfix),
        );
    }

    return stories.reduce<string[]>((acc, story) => {
        const postfixedNames = postfixes.map((postfix) =>
            generateFileName(component, story, postfix),
        );

        acc.push(...postfixedNames);

        return acc;
    }, []);
};

export { getValidFilenames };
