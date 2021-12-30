const testTemplateMock = jest.fn(
    (componentName, storyName) => `${componentName}-${storyName}`,
);

export { testTemplateMock };
