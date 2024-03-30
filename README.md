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

Note: This doesn't always fix everything which may be due to a mistake in how I've set it up.


#### Editor integration

If you are using [Visual Studio Code](https://code.visualstudio.com/) and want editor integration,

1. Install the following extensions:
  - [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
  - [Vue](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Use the following config to enable autoformatting:

    ```sh
    {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
      }
    }
    ```
