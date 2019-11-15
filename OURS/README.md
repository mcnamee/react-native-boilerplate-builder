# React Native Starter Kit

---

## 👋 Intro

This boilerplate launches with a [React Native app](https://facebook.github.io/react-native/).

The project is _super_ helpful to kick-start your next project, as it provides a lot of the common tools you may reach for, all ready to go. Specifically:

- A shared React and React Native structure
- __Flux architecture__
    - [Redux](https://redux.js.org/docs/introduction/)
    - Redux Wrapper: [Rematch](https://github.com/rematch/rematch)
- __Routing and navigation__
    - [React Native Router Flux](https://github.com/aksonov/react-native-router-flux) for native mobile
- __Data Caching / Offline__
    - [Redux Persist](https://github.com/rt2zz/redux-persist)
- __UI Toolkit/s__
    - [Native Base](https://nativebase.io/) for native mobile
- __Code Linting__ with
    - [Airbnb's JS Linting](https://github.com/airbnb/javascript) guidelines
- __Deployment strategy__
    - [Both manual and automated strategies](/docs/deploy.md)
- __Splash Screen + Assets__
    - [React Native Splash Screen](https://github.com/crazycodeboy/react-native-splash-screen)

---

## 📖 Docs

- [Contributing to this project](/docs/contributing.md)
- [FAQs & Opinions](/docs/faqs.md)
- [Tests & testing](/docs/testing.md)
- [Understanding the file structure](/docs/file-structure.md)
- [Deploy the app](/docs/deploy.md)

---

## 🚀 Getting Started

 - Install [React Native Debugger](https://github.com/jhen0409/react-native-debugger/releases) and open before running the app
 - Install `eslint`, `prettier` and `editor config` plugins into your IDE
 - Ensure your machine has the [React Native dependencies installed](https://facebook.github.io/react-native/docs/getting-started)

```bash
# Install dependencies
yarn install && ( cd ios && pod install )
```

#### iOS

```bash
# Open in Xcode
# Change to Use the legacy Build System: `File > Workspace Settings > Build System > Legacy Build System`

# Start in the iOS Simulator
npx react-native run-ios --simulator="iPhone 11"
```

#### Android

```bash
# Start in the Android Simulator
#  - Note: open Android Studio > Tools > AVD > Run a device
#  - Example device specs: https://medium.com/pvtl/react-native-android-development-on-mac-ef7481f65e47#d5da
npx react-native run-android
```

---

## 👊 Further Help?

This repo is a great place to start, but if you'd prefer to sit back and have your new project built for you, [get in touch with me directly](https://mcnam.ee) and I can organise a quote.