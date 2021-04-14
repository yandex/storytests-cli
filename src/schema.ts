import Joi from 'joi';

const isRegExp = (value: unknown): value is RegExp => value instanceof RegExp;

const schema = Joi.object({
    testTemplate: Joi.func(),
    generateFileName: Joi.func(),

    storyFilesPath: Joi.string(),
    relativeTestDirectoryPath: Joi.string(),
    testFilePostfixes: Joi.array().items(Joi.string()),
    testGenerationStrategy: Joi.allow('story', 'component'),

    componentNamePattern: Joi.custom(isRegExp),
    storyNamePattern: Joi.custom(isRegExp),
});

export { schema };
