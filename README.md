<div align="center"> <a href="https://github.com/DoverLee/access-control-front"> <img alt="VbenAdmin Logo" width="200" height="200" src="https://DoverDee.github.io/DoverDee/images/logo.png"> </a> <br> <br>

[![license](https://img.shields.io/github/license/DoverLee/access-control-front.svg)](LICENSE)

<h1>Vue vben admin</h1>
</div>

**English** | [中文](./README.zh-CN.md)

## Introduction

Vue Access Control is a free and open source middle platform/back-end template. Using the latest `vue3`, `vite4`, `TypeScript` and other mainstream technology, Vben is the out-of-the-box front-end solution for both production and learning purpose.

## Features

- **State-of-art Techinical Stack**：Using the latest and popular front-end technology such as Vue3/vite2
- **TypeScript**: Application-level JavaScript language
- **Theming**: Configurable themes
- **International**：Built-in i18n support
- **Response Mock**: Built-in response mock ability
- **Authority**: Built-in permission system based on dynamic routes.
- **Component**: Extracted and encapsulated components for various scenarios.

## Preview

- [access-control](https://gitee.com/DoverLee/access-control-front/) - Full version (Chinese)
- [access-control-gh-pages](https://DoverDee.github.io/access-control/) - Full version (github hosted)
- [access-control-thin-next](https://gitee.com/DoverLee/access-control-front/thin/next/) - Simplified Version (Chinese)
- [access-control-thin-gh-pages](https://DoverDee.github.io/access-control-thin-next/) -Simplified Version (github hosted)

Test account: vben/123456

<p align="center">
    <img alt="VbenAdmin Logo" width="100%" src="https://DoverDee.github.io/DoverDee/images/preview1.png">
    <img alt="VbenAdmin Logo" width="100%" src="https://DoverDee.github.io/DoverDee/images/preview2.png">
    <img alt="VbenAdmin Logo" width="100%" src="https://DoverDee.github.io/DoverDee/images/preview3.png">
</p>

### Use Gitpod

Open the project in Gitpod (free online dev environment for GitHub) and start coding immediately.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/DoverLee/access-control-front)

## Documentation

[Document](https://gitee.com/DoverLee/access-control-front/)

## Preparation

- [node](http://nodejs.org/) and [git](https://git-scm.com/) - Project development environment
- [Vite](https://vitejs.dev/) - Familiar with vite features
- [Vue3](https://v3.vuejs.org/) - Familiar with Vue basic syntax
- [TypeScript](https://www.typescriptlang.org/) - Familiar with the basic syntax of `TypeScript`
- [Es6+](http://es6.ruanyifeng.com/) - Familiar with es6 basic syntax
- [Vue-Router-Next](https://next.router.vuejs.org/) - Familiar with the basic use of vue-router
- [Ant-Design-Vue](https://antdv.com/docs/vue/introduce-cn/) - ui basic use
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs basic syntax

## Install and use

- Get the project code

```bash
git clone https://github.com/DoverLee/access-control-front.git
```

- Install dependencies

```bash
cd access-control

pnpm install

```

- run

```bash
pnpm serve
```

- build

```bash
pnpm build
```

- docker

### The dockerFile is located in the project root directory and supports differential deployment

#### build image

```bash
docker build -t access-control .
```

#### Use environment variables to achieve differentiated container deployment. Specify service endpoint by assigning `VG_BASE_URL`. In the following example, `http://localhost:3333` is used as the back-end service address and the container is mapped to port `6666`:

```bash
docker run --name access-control -d -p 6666:80  -e VG_BASE_URL=http://localhost:3333 access-control
```

Then you can navigate to `http://localhost:6666`

## Change Log

[CHANGELOG](./CHANGELOG.zh_CN.md)

## Project

- [access-control](https://github.com/DoverLee/access-control-front) - full version
- [access-control-thin-next](https://github.com/DoverDee/access-control-thin-next) - Simplified version

## How to contribute

You are very welcome to join！[Raise an issue](https://github.com/DoverLee/access-control-front/issues/new/choose) or submit a Pull Request。

**Pull Request:**

1. Fork code!
2. Create your own branch: `git checkout -b feat/xxxx`
3. Submit your changes: `git commit -am 'feat(function): add xxxxx'`
4. Push your branch: `git push origin feat/xxxx`
5. submit`pull request`

## Git Contribution submission specification

- reference [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) specification ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` Add new features
  - `fix` Fix the problem/BUG
  - `style` Modify the code style/format that does not affect the feature
  - `perf` Optimization/performance improvement
  - `refactor` Refactor
  - `revert` Undo edit
  - `test` Test related
  - `docs` Documentation/notes
  - `chore` Dependency update/scaffolding configuration modification etc.
  - `workflow` Workflow improvements
  - `ci` Continuous integration
  - `types` Type definition file changes
  - `wip` In development

## Related warehouse

If these plugins are helpful to you, you can show support by leaving a star!

- [vite-plugin-mock](https://github.com/DoverDee/vite-plugin-mock) - Used for local and development environment data mock
- [vite-plugin-html](https://github.com/DoverDee/vite-plugin-html) - Used for html template conversion and compression
- [vite-plugin-compression](https://github.com/DoverDee/vite-plugin-compression) - Used to pack input .gz|.brotil files
- [vite-plugin-svg-icons](https://github.com/DoverDee/vite-plugin-svg-icons) - Used to quickly generate svg sprite

## Browser support

The `Chrome 80+` browser is recommended for local development

Support modern browsers, doesn't include IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Maintainer

[@Vben](https://github.com/DoverDee) [@Jinmao](https://github.com/jinmao88)

## Thanks

<img src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" alt="JetBrains Logo (Main) logo." height="120">

## Star History Chart

[![Star History Chart](https://api.star-history.com/svg?repos=vbenjs/access-control&type=Date)](https://star-history.com/#vbenjs/access-control&Date)

## License

[MIT © Vben-2020](./LICENSE)
