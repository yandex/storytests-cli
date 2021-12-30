const getComponentStories = (
    fileContent: string,
    pattern: RegExp | string,
): string[] => {
    const matches = fileContent.match(pattern);

    return matches === null ? [] : matches;
};

export { getComponentStories };
