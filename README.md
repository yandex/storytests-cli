# Storytests CLI

CLI Utility to generate test files from matched [Storybook](https://storybook.js.org/) files.

## Installation

You can install `storytests-cli` using npm or yarn:

```bash
npm i storytests-cli --save-dev
# or
yarn add -D storytests-cli
```

## Usage

Prerequisites: [Node.js](https://nodejs.org/en/) (`>10.4.0`).

Create a config file named `storytests.config.js`, names like `storytestsrc.cjs` or `storytests.conf.js` would also work. Read about [configuration](#configuration) in detail.

When configured can be run with:

```bash
npm run storytests
# or
yarn storytests
```

Config file in the project root will be hooked up automatically. If you are using a different location or name for your config file, pass relative path to it with `-c, --config` argument.

```bash
yarn storytests -c ./.config/storytests.config.js
```

By default, if an existing test file is found, it will not be rewritten. If you want to rewrite existing test files, pass `-r, --rewrite` flag.

You can also display a help message with `--help`.

## Configuration

`storytests-cli` can be configured with the following properties:

-   ```ts
    testGenerationStrategy: 'component' | 'story';
    ```

    When set to `'component'` a separate test file will be created for every matched **file**. When set to `'story'` a separate test file will be created for every matched **story** in a file.

-   ```ts
    relativeTestDirectoryPath: string;
    ```

    Path to the folder where test files will be created relative to the matched file folder.

-   ```ts
    testFilePostfixes: string[];
    ```

    Postfixes for generated test files. For example, to create [`hermione`](https://github.com/gemini-testing/hermione) and other generic test files you can specify `['hermione', 'test']` as the value.

-   ```ts
    storyFilesPath: string[];
    ```

    Absolute path glob pattern to match desired story files.

-   ```ts
    componentNamePattern: RegExp;
    ```

    RegExp to match the component name in a Storybook file.

-   ```ts
    storyNamePattern: RegExp;
    ```

    RegExp to match the story names in a Storybook file.

-   ```ts
    testTemplate: (
        component: string,
        story: string | string[],
        postfix: string,
    ) => string | false;
    ```

    A function that gets called for every file with every possible combination of stories/postfixes and should return test file content. Recieves matched component name (the result of the match from `componentNamePattern`), stories matched from `storyNamePattern` in the file or a single story name (if `testGenerationStrategy` is set to `'story'`), as well as the postfix from `testFilePostfixes`. This function could also return `false` (not any other falsy value though), then no test file for this combination of arguments will be created.

-   ```ts
    generateFileName: (name: string, postfix: string) => string;
    ```

    A function that gets called before `testTemplate` and should return the file name. If `testGenerationStrategy` is set to `component`, `name` parameter is the matched component name, otherwise it is the story name.

## Acknowledgements

Inspired by [Storytests Webpack Plugin](https://github.com/yandex/storytests-webpack-plugin) by [baushonok](https://github.com/baushonok)

## License

[MPL-2.0](/LICENSE)
