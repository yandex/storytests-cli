const getComponentName = (
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

export { getComponentName };
