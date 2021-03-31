# React Boilerplate Builder

This repo is used to create a new React &/or React Native App, using the latest version of React/React Native and all dependencies.

All new commits (changes to this repo) are automatically pushed to:

- [React Native Starter Kit](https://github.com/mcnamee/react-native-starter-kit)
- [React Native Starter Kit (Expo version)](https://github.com/mcnamee/react-native-expo-starter-kit)
- [React Starter Kit (web)](https://github.com/mcnamee/react-starter-kit)

`build.sh` essentially just:

- `npx create-react-app`, `react-native init` or `expo init`'s a new app
- Adds a bunch of commonly used dependencies (eg. Redux, a Router, Forms etc)
- Adds familiar developer dependencies like the AirBnB linting code style
- Adds a simple boilerplate codebase (with things like a directory structure, Redux and the Router configured, common components etc)
- Adds familiar IDE configuration like prettier and eslint
- Documentation for common tasks
- (React Native) Fastlane configuration for App Store deployment

### ❓ Why?

I was used to using a boilerplate app when building a new app, where I'd spend the first few hours updating dependencies and diffing against the latest version of a fresh React/React Native app. I wanted each project to use the latest and greatest (#fomo).

### ❓ Why Not?

Creating a project where dependency versions are not locked, can lead to instability. For example if dependency-X's latest version is a major release ahead of the last tested version, it may break your new app. Be aware.

## 🔨 Requirements

- MacOS _(this creation script has only been tested on a Mac)_
- Node v15+
- NPM v6+
- `yarn`
- `rsync`
- Cocoapods (for React Native)

## 🚀 Usage

```bash
bash build.sh
```
