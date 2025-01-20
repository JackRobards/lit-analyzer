## Configuration

You can configure this plugin through your `tsconfig.json`.

### Example

<!-- prettier-ignore -->
```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "@jackolope/ts-lit-plugin",
        "strict": true,
        "rules": {
          "no-unknown-tag-name": "off",
          "no-unknown-event": "warn"
        }
      }
    ]
  }
}
```

### Available options

{{ load:./../../docs/readme/config-table.md }}
