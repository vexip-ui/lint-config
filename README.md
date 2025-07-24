<p align="center">
  <a href="https://www.vexipui.com/" target="_blank" rel="noopener noreferrer">
    <img src="https://github.com/vexip-ui/vexip-ui/raw/main/docs/public/vexip-ui.svg" alt="" style="width: 180px;" />
  </a>
</p>

<h1 align="center">Vexip Lint Config</h1>

## Usage

### Eslint

```sh
pnpm add -D eslint @eslint/js @vexip-ui/eslint-config
```

In your `eslint.config.js`:

```js
import factory from '@vexip-ui/eslint-config'

export default factory()
```

### Others

Install:

```sh
# commitlint
pnpm add -D @commitlint/cli @vexip-ui/commitlint-config

# prettier
pnpm add -D prettier @vexip-ui/prettier-config

# stylelint
pnpm add -D stylelint @vexip-ui/stylelint-config
```

Then in your `xxxlintrc.cjs`:

```js
module.exports = {
  extends: ['@vexip-ui/xxxlint-config'],
}
```

Or in your `xxxlintrc.mjs`:

```js
export default {
  extends: ['@vexip-ui/xxxlint-config'],
}
```

For `prettierrc.cjs` just a little different:

```js
module.exports = require('@vexip-ui/prettier-config')
```

```js
export { default } from '@vexip-ui/prettier-config'
```

## License

[MIT License](./LICENSE.md)
