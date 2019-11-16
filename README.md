# React Boilerplate Builder

This repo is used to create a new React &/or React Native App, using the latest version of React/React Native and all dependencies.

`fresh.sh` essentially just:

- `npx create-react-app` or `react-native init`'s a new app
    - _For React Native - Expo is great, however the majority of apps I build need third party native modules, so I now just default to plain old react-native_
- Adds a bunch of commonly used dependencies (eg. Redux, a Router, Forms etc)
- Adds familiar developer dependencies like the AirBnb linting code style
- Adds a simple boilerplate codebase (with things like a directory structure, Redux and the Router configured, common components etc)
- Adds familiar IDE configuration like prettier and eslint
- Documentation for common tasks
- Fastlane configuration for App Store deployment

### ❓ Why?

I was used to using a boilerplate app when building a new app, where I'd spend the first few hours updating dependencies and diffing against the latest version of a fresh React/React Native app. I wanted each project to use the latest and greatest (#fomo).

### ❓ Why Not?

Creating a project where dependency versions are not locked, can lead to instability. For example if dependency-X's latest version is a major release ahead of the last tested version, it may break your new app. Be aware.

## 🔨 Requirements

- MacOS _(this creation script has only been tested on a Mac)_
- Node v12+
- NPM v6+
- `yarn`
- `rsync`
- Cocoapods (React Native)

## 🚀 Usage

```bash
bash fresh.sh
```
