## Installation

First, install the plugin:

<!-- prettier-ignore -->
```bash
npm install @jackolope/ts-lit-plugin -D
```

Then add a `plugins` section to your [`tsconfig.json`](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html):

<!-- prettier-ignore -->
```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@jackolope/ts-lit-plugin"
      }
    ]
  }
}
```

Finally, restart you Typescript Language Service, and you should start getting diagnostics from `@jackolope/ts-lit-plugin`.

**Note:**

- If you use Visual Studio Code you can also install the [lit-plugin](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin) extension.
- If you would rather use a CLI, you can install the [lit-analyzer](https://github.com/JackRobards/lit-analyzer/blob/master/packages/lit-analyzer).
