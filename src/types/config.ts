type Config = {
    generateTest: (
        component: string,
        story: string | string[],
        postfix: string,
    ) => string | false;
    generateFileName: (
        component: string,
        story: string | string[],
        postfix: string,
    ) => string;

    filesGlob: string;
    testDirectory: ((component: string, path: string) => string) | string;
    postfixes: string[];
    strategy: 'component' | 'story';

    componentPattern: RegExp | string;
    storyPattern: RegExp | string;

    validateFileName?: (
        path: string,
        component: string,
        stories: string[],
    ) => boolean;
};

/* eslint-disable @typescript-eslint/ban-types*/
type AnyFunctionUnion<T> = Extract<T, Function> extends never
    ? T
    : Exclude<T, Function> | Function;
/* eslint-enable @typescript-eslint/ban-types*/

type Schema<T> = {
    [Key in keyof T]-?: [Validator<AnyFunctionUnion<T[Key]>>, string];
};

type Validator<T> = (value: unknown) => value is T;

export type { Config, Schema, Validator };
