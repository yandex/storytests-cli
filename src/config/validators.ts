import { Validator } from 'types/config';

const isOptional = (value: unknown): value is undefined =>
    typeof value === 'undefined';

const isRegExp = (value: unknown): value is RegExp => value instanceof RegExp;

// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = (value: unknown): value is Function =>
    typeof value === 'function';

const isString = (value: unknown): value is string => typeof value === 'string';

const isArray = <T>(isType: (value: unknown) => value is T) => {
    return (value: unknown): value is Array<T> =>
        Array.isArray(value) && value.length > 0 && value.every(isType);
};

const isStrategy = (value: unknown): value is 'story' | 'component' =>
    value === 'story' || value === 'component';

const combine = <T extends unknown = unknown>(
    ...validators: Validator<T>[]
) => {
    return (value: unknown): value is T =>
        validators.some((validator) => validator(value));
};

export {
    isOptional,
    isRegExp,
    isFunction,
    isString,
    isArray,
    isStrategy,
    combine,
};
