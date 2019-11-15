# React Native Starter Kit Builder

This repo is used to create a new React Native App, using the latest version of React Native and all dependencies.

`fresh.sh` essentially just:

- `react-native init`'s a new React Native app (not Expo'd)
    - _Expo is great, however the majority of apps I build need third party native modules, so I now just default to plain old react-native_
- Adds a bunch of commonly used dependencies (eg. Redux, a Router, Forms etc)
- Adds familiar developer dependencies like the AirBnb linting code style
- Adds a simple boilerplate codebase (with things like a directory structure, Redux and the Router configured, common components etc)
- Adds familiar IDE configuration like prettier and eslint
- Documentation for common tasks
- Fastlane configuration for App Store deployment

### ❓ Why?

I was used to using a boilerplate app when building a new app, where I'd spend the first few hours updating dependencies and diffing against the latest version of a fresh React Native app. I wanted each project to use the latest and greatest (#fomo).

### ❓ Why Not?

Creating a project where dependency versions are not locked, can lead to instability. For example if dependency-X's latest version is a major release ahead of the last tested version, it may break your new app. Be aware.

## 🔨 Requirements

- MacOS _(this creation script has only been tested on a Mac)_
- Cocoapods
- Node v12+
- NPM v6+
- `yarn`
- `rsync`

## 🚀 Usage

```bash
bash fresh.sh
```
