# AsheronDB Website

https://asherondb.com

## Development

### Code Style

This project uses Nuxt's relatively new (as of 2024/03/22) [eslint-config](https://nuxt.com/docs/guide/concepts/code-style#eslint).

To lint the entire project, run:

```sh
npm run lint
npm run lint:fix # to fix
```

If you are using [Visual Studio Code](https://code.visualstudio.com/) and want editor integration,

1. Install the [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Use the following config to enable autoformatting:

    ```sh
    {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
      }
    }
    ```
