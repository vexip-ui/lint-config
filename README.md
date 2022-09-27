<p align="center">
  <a href="https://www.vexipui.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://github.com/vexip-ui/vexip-ui/raw/main/docs/public/vexip-ui.svg" style="width: 180px;" />
  </a>
</p>

<h1 align="center">Vexip Lint Config</h1>

## Usage

Install:

```sh
# commitlint
pnpm add -D @commitlint/cli @vexip-ui/commitlint-config

# eslint
pnpm add -D eslint @vexip-ui/eslint-config

# prettier
pnpm add -D prettier @vexip-ui/prettier-config

# stylelint
pnpm add -D stylelint @vexip-ui/stylelint-config
```

Then in your `xxxlintrc.js`:

```js
module.exports = {
  extends: ['@vexip-ui/xxxlint-config']
}
```

For `prettierrc.js` just a little defferent:

```js
module.exports = require('@vexip-ui/prettier-config')
```

## License

[MIT License](./LICENSE.md)
