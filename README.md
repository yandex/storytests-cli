# Storytests CLI

CLI Utility to generate test files from matched [Storybook](https://storybook.js.org/) files.

## Table of Contents

  * [Storytests CLI](#storytests-cli)
  * [Table of Contents](#table-of-contents)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Configuration](#configuration)
  * [Example](#example)
  * [Acknowledgements](#acknowledgements)
  * [License](#license)


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

## Example

Let's imagine we have a simple Button component story:

```jsx
// button.stories.tsx

// ...

export default {
  title: "Components/Button",
  component: Button,
} as Meta;

const Template: Story = ({ label, ...args }) => (
  <Button {...args}>{label}</Button>
);

// @storytests-ignore
export const Playground = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
  view: "primary",
};

// ...

```

We want to create [`hermione`](https://github.com/gemini-testing/hermione) and [`playwright`](https://playwright.dev) test files from this story. Take a look at a sufficient `storytests.config.js`.

````javascript
// storytests.config.js

const path = require('path');

const hermioneTemplate = require('./storytests/hermione.template');
const playwrightTemplate = require('./storytests/playwright.template');

module.exports = {
  /**
   * Should match `Components/Button`
   * ```
   * export default {
   *   title: "Components/Button",
   *   component: Button,
   * } as Meta;
   * ```
   */
  componentNamePattern: /(?<=title: ")[a-z/]+/gi,

  /**
   * Should match `Primary`
   * ```
   * export const Primary = Template.bind({});
   * ```
   *
   * Should not match `Playground`
   * ```
   * // @storytests-ignore
   * export const Playground = Template.bind({});
   * ```
   */
  storyNamePattern: /(?<!\/\/ @storytests-ignore[ \r\n]export const )\b[a-z]+(?= = Template.bind\()/gi,

  /**
   * Generate a single test file for a single component, not for every story
   */
  testGenerationStrategy: 'component',

  /**
   * Generate test files in the same directory as stories file
   */
  relativeTestDirectoryPath: './',

  /**
   * Generate `hermione` and `playwright` (though we can use any names here, they get passed to our hooks)
   */
  testFilePostfixes: ['hermione', 'playwright'],

  /**
   * Glob pattern to match story files
   */
  storyFilesPath: path.resolve(__dirname, './src/**/*.stories.tsx'),

  /**
   * A hook function to generate test file contents
   * @param {string} componentPath component name (match from `componentNamePattern`)
   * @param {string[]} stories story names as an array (matches from `storyNamePattern`, could be empty)
   * @param {string} postfix test file postfix
   * @returns {string|false} could return false then this file will not be generated
   */
  testTemplate: (componentPath, stories, postfix) => {
    switch (postfix) {
      case 'hermione':
        return hermioneTemplate(componentPath, stories);
      case 'playwright':
        return playwrightTemplate(componentPath, stories);
      default:
        return false;
    }
  },

  /**
   * A hook function to generate file name
   */
  generateFileName: (componentPath, postfix) => {
    const componentParts = componentPath.split('/');

    const component = componentParts[
      componentParts.length - 1
    ].toLowerCase();

    const isPlaywright = postfix === 'playwright';

    const type = isPlaywright ? 'spec' : postfix;

    const extention = isPlaywright ? 'ts' : 'js';

    // Even though we specified `playwright` as a postfix in the config we are free to use any names we want
    return `${component}.${type}.${extention}`;
  },
};
````

Now when we run `yarn storytests` in the project we should see `button.hermione.js` and `button.spec.ts` generated in the same folder as `button.stories.tsx` according to imported template functions which could look like this:

```javascript
/**
 * Generates a hermione test file from template
 * @param {string} componentPath component name
 * @param {string[]} stories story names as an array
 */
const hermioneTemplate = (componentPath, stories) => {
  if (stories.length === 0) {
    return false;
  }

  const kebabCaseComponent = componentPath.toLowerCase().replace(/\//g, "-");
  const componentParts = componentPath.split("/");
  const component = componentParts[componentParts.length - 1];
  const kebabCaseStories = stories.map((story) =>
    story.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
  );
  const storyNames = stories.map((story) =>
    story.replace(/([a-z])([A-Z])/g, "$1 $2")
  );

  return `describe("${component}", function () {
  const selector = ".story";
        ${kebabCaseStories
          .map(
            (story, index) => `
  it("${storyNames[index]}", function () {
    return this.browser
      .url("iframe.html?id=${kebabCaseComponent}--${story}")
      .assertView("${story}", selector);
  });`
          )
          .join("\n")}
});
`;
};

module.exports = hermioneTemplate;
```

Resulting `button.hermione.js` could look something like this: 


```javascript
describe("Button", function () {
  const selector = ".story";
        
  it("Primary", function () {
    return this.browser
      .url("iframe.html?id=components-button--primary")
      .assertView("primary", selector);
  });

  // ...

});
```

You can check out the repository with this example more in depth at [`storytests-cli-example`](https://github.com/yakovlev-alexey/storytests-cli-example)

## Acknowledgements

Inspired by [Storytests Webpack Plugin](https://github.com/yandex/storytests-webpack-plugin) by [baushonok](https://github.com/baushonok)

## License

[MPL-2.0](/LICENSE)
