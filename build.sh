#!/usr/bin/env bash

# Arguments
# ---------------------------------------------

for i in "$@"
do
  case $i in
    -n=*|--name=*)
      APP_NAME="${i#*=}"
      shift # past argument=value
    ;;
    -t=*|--type=*)
      APP_TYPE="${i#*=}"
      shift # past argument=value
    ;;
    *)
      # unknown option
    ;;
  esac
done

# Config - When arguments not supplied
# ---------------------------------------------

# App Name
if [[ -z "$APP_NAME" ]]; then
  echo -e "\n  ➤  What would you like the new App to be called? [eg. AwesomeProject] \n"
  read -p " ==   " APP_NAME
fi

# App Type
if [[ -z "$APP_TYPE" ]]; then
  echo -e "\n  ➤  What type of app are you wanting to build? (enter the number)"
  echo -e "\n     1. React"
  echo -e "\n     2. React Native"
  echo -e "\n     3. React Native Expo \n"
  read -p " ==   " APP_TYPE
fi

# Validate our Config
# ---------------------------------------------

# App Name
APP_NAME=$(echo $APP_NAME | tr -cd '[[:alnum:]].')
APP_NAME_LOWER=`echo "$APP_NAME" | tr '[:upper:]' '[:lower:]'`

if [[ -z "$APP_NAME" ]]; then
  echo -e "\n  ⚠  Please enter an App Name..."
  exit 1
fi

# App Type
if [[ 1 == $APP_TYPE ]]; then
  APP_TYPE="REACT"
elif [[ 2 == $APP_TYPE ]]; then
  APP_TYPE="REACT NATIVE"
else
  APP_TYPE="EXPO"
fi

echo -e "\n -----------------------------------------------------------"
echo -e " Building you a *${APP_TYPE}* app called *${APP_NAME}*"
echo -e " -----------------------------------------------------------"

# All
# ---------------------------------------------

# Replace all of OUR files with the app name
LC_ALL=C find ./OURS -type f -exec sed -i '' 's/AwesomeProject/'"$APP_NAME"'/g' {} +
LC_ALL=C find ./OURS-WEB -type f -exec sed -i '' 's/AwesomeProject/'"$APP_NAME"'/g' {} +
LC_ALL=C find ./OURS-NATIVE -type f -exec sed -i '' 's/AwesomeProject/'"$APP_NAME"'/g' {} +
LC_ALL=C find ./OURS-EXPO -type f -exec sed -i '' 's/AwesomeProject/'"$APP_NAME"'/g' {} +

# React
# ---------------------------------------------

if [[ "REACT" == $APP_TYPE ]]; then

  # Remove the Native and Expo files
  rm -rf OURS-NATIVE
  rm -rf OURS-EXPO
  rm -rf .github

  # Install the latest React Native into a subdirectory
  npx create-react-app $APP_NAME_LOWER

  # Copy all of the files into the root
  rsync -r --inplace --links --exclude 'src' ./$APP_NAME_LOWER/. ./ && rm -rf $APP_NAME_LOWER

  # Install extra dependencies
  yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @rematch/core @rematch/loading @rematch/persist axios bootstrap jsonwebtoken moment node-sass prop-types react-helmet react-hook-form react-redux react-router-dom reactstrap redux-persist

  # Install Dev dependencies
  yarn add @testing-library/jest-dom @testing-library/react eslint-config-airbnb eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y eslint-plugin-react react-test-renderer snapshot-diff gh-pages --dev

  # Copy our files (eg. appicon, launch screen, src code etc)
  rsync -r --inplace ./OURS/. ./ && rm -rf ./OURS
  rsync -r --inplace ./OURS-WEB/. ./ && rm -rf ./OURS-WEB

  # Add gh_pages scripts
  LC_ALL=C sed -i '' 's~"eject": "react-scripts eject"~"eject": "react-scripts eject", "predeploy": "react-scripts build", "deploy": "gh-pages -d build"~g' package.json

  # Add gh_pages homepage
  LC_ALL=C sed -i '' 's~"version": "0.1.0",~"version": "0.1.0", "homepage": "https://react-starter-kit.mcnam.ee",~g' package.json

  # Add gh_pages SPA script
  LC_ALL=C sed -i '' 's`</title>`</title> <script type="text/javascript">!function(i){if(i.search){var a={};i.search.slice(1).split("&").forEach((function(i){var l=i.split("=");a[l[0]]=l.slice(1).join("=").replace(/~and~/g,"&")})),void 0!==a.p&&window.history.replaceState(null,null,i.pathname.slice(0,-1)+(a.p||"")+(a.q?"?"+a.q:"")+i.hash)}}(window.location)</script>`g' public/index.html

fi

# React Native
# ---------------------------------------------

if [[ "REACT NATIVE" == $APP_TYPE ]]; then

  # Remove the Web and Expo files
  rm -rf OURS-WEB
  rm -rf OURS-EXPO
  rm -rf .github

  # Install the latest React Native into a subdirectory
  npx react-native init $APP_NAME

  # Copy all of the files into the root
  rsync -r --inplace --links --exclude '__tests__' ./$APP_NAME/. ./ && rm -rf $APP_NAME

  # Install extra dependencies
  yarn add @react-native-community/async-storage @rematch/core @rematch/loading @rematch/persist axios jsonwebtoken moment native-base prop-types react-native-router-flux react-native-gesture-handler react-native-reanimated react-native-screens react-native-splash-screen react-native-vector-icons react-redux redux-persist react-hook-form

  # Install (and remove) Dev dependencies
  yarn add babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y eslint-plugin-react @testing-library/react-native --dev && yarn remove @react-native-community/eslint-config

  # Link the dependencies
  npx react-native link
  cd ios && pod install
  cd ../

  # Eject Native Base
  node node_modules/native-base/ejectTheme.js

  # Copy our files (eg. appicon, launch screen, src code etc)
  rsync -r --inplace ./OURS-NATIVE/ios/. ./ios/$APP_NAME && rm -rf ./OURS-NATIVE/ios
  rsync -r --inplace ./OURS/. ./ && rm -rf ./OURS
  rsync -r --inplace ./OURS-NATIVE/. ./ && rm -rf ./OURS-NATIVE

  # Name the app correctly
  LC_ALL=C find . -type f -exec sed -i '' 's/com.AwesomeProject/com.'"$APP_NAME"'/g' {} +
  LC_ALL=C find . -type f -exec sed -i '' 's/org.reactjs.native.example/com/g' {} +

  # iOS, Splash Screen config
  LC_ALL=C sed -i '' 's~<React/RCTRootView.h>~<React/RCTRootView.h>\
#import "RNSplashScreen.h"~g' ios/${APP_NAME}/AppDelegate.m
  
  LC_ALL=C sed -i '' "s~return YES;~[RNSplashScreen show];\\
  return YES;~g" ios/${APP_NAME}/AppDelegate.m

  # Android, Splash Screen config
  LC_ALL=C sed -i '' "s~facebook.react.ReactActivity;~facebook.react.ReactActivity;\\
import android.os.Bundle;\\
import org.devio.rn.splashscreen.SplashScreen;~g" android/app/src/main/java/com/${APP_NAME_LOWER}/MainActivity.java

  LC_ALL=C sed -i '' "s~ReactActivity {~ReactActivity {\\
  // Show RN Splash Screen on launch\\
  @Override\\
  protected void onCreate(Bundle savedInstanceState) {\\
    SplashScreen.show(this);\\
    super.onCreate(savedInstanceState);\\
  }~g" android/app/src/main/java/com/${APP_NAME_LOWER}/MainActivity.java

  # Android, React Navigation/Native Screens fix
  LC_ALL=C sed -i '' "s~dependencies {~dependencies {\\
    implementation 'androidx.appcompat:appcompat:1.1.0-rc01'\\
    implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'~g" android/app/build.gradle

  # Add Xcode workspace settings (primarily the build system one)
  mkdir ios/${APP_NAME}.xcworkspace/xcshareddata && echo '<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>BuildSystemType</key>
        <string>Original</string>
        <key>PreviewsEnabled</key>
        <false/>
    </dict>
</plist>' > ios/${APP_NAME}.xcworkspace/xcshareddata/WorkspaceSettings.xcsettings

  # Jest Test Config
  LC_ALL=C sed -i '' 's~"preset": "react-native"~"preset": "@testing-library/react-native",\
    "transformIgnorePatterns": [\
      "node_modules/(?!((jest-)?react-native|react-clone-referenced-element?/.*|react-navigation|redux-persist|native-base(-shoutem-theme)|native-base|react-native-router-flux|@react-native-community/async-storage))"\
    ]~g' package.json

fi

# Expo
# ---------------------------------------------

if [[ "EXPO" == $APP_TYPE ]]; then

  # Remove the Web and Native files
  rm -rf OURS-WEB
  rm -rf .github

  # Ensure Expo is installed
  npm install -g expo-cli

  # Install the latest Expo app into a subdirectory
  expo init $APP_NAME --non-interactive --yarn --template blank --name $APP_NAME

  # Copy all of the files into the root
  rsync -r --inplace --links --exclude '__tests__' ./$APP_NAME/. ./ && rm -rf $APP_NAME

  # Install extra dependencies
  yarn add @react-native-community/async-storage @rematch/core @rematch/loading @rematch/persist axios jsonwebtoken moment native-base prop-types react-native-router-flux react-native-gesture-handler react-native-reanimated react-native-screens expo-font @expo/vector-icons react-redux redux-persist react-hook-form

  # Install (and remove) Dev dependencies
  yarn add jest eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jest eslint-plugin-jsx-a11y eslint-plugin-react @testing-library/react-native react-test-renderer jest-expo jest-transform-stub --dev && yarn remove @react-native-community/eslint-config

  # Eject Native Base
  node node_modules/native-base/ejectTheme.js

  # Remove un-needed Native things
  rm -rf ./OURS-NATIVE/android
  rm -rf ./OURS-NATIVE/documentation
  rm -rf ./OURS-NATIVE/fastlane
  rm -rf ./OURS-NATIVE/ios

  # Copy our files (eg. appicon, launch screen, src code etc)
  rsync -r --inplace ./OURS/. ./ && rm -rf ./OURS
  rsync -r --inplace ./OURS-NATIVE/. ./ && rm -rf ./OURS-NATIVE
  rsync -r --inplace ./OURS-EXPO/. ./ && rm -rf ./OURS-EXPO

  # Name the app correctly
  LC_ALL=C find . -type f -exec sed -i '' 's/com.AwesomeProject/com.'"$APP_NAME"'/g' {} +
  LC_ALL=C find . -type f -exec sed -i '' 's/org.reactjs.native.example/com/g' {} +
  
  # Change AsyncStorage to the Expo version
  LC_ALL=C sed -i '' "s~AsyncStorage from '@react-native-community/async-storage'~{ AsyncStorage } from 'react-native'~g" src/store/index.js
  LC_ALL=C sed -i '' "s~AsyncStorage from '@react-native-community/async-storage'~{ AsyncStorage } from 'react-native'~g" src/lib/api.js

  # Jest Test Config
  LC_ALL=C sed -i '' 's~"preset": "jest-expo"~"preset": "@testing-library/react-native",\
    "setupFiles": ["jest-expo/jest-preset.js"],\
    "setupFilesAfterEnv": ["@testing-library/react-native/jest-preset.js"],\
    "transform": { ".+\\\\.(png|jpg|ttf|woff|woff2)$": "jest-transform-stub" },\
    "transformIgnorePatterns": [\
      "node_modules/(?!(jest-)?react-native|@expo/vector-icons|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base)"\
    ]~g' package.json
  LC_ALL=C sed -i '' 's~jest --watchAll~jest --watchAll --silent~g' package.json

fi

# Output the next steps
# ---------------------------------------------

echo -e "---------------------------------------------------------------------"
echo -e "---------------------------------------------------------------------"
echo -e " "
echo -e "           ✓  ${APP_TYPE} App Installed Successfully!"
echo -e "                               -"
echo -e " "
echo -e "     Please follow the instructions in README.md for next steps."
echo -e "                        https://mcnam.ee"
echo -e " "
echo -e "---------------------------------------------------------------------"
echo -e "---------------------------------------------------------------------"

# Clean Up
# ---------------------------------------------

# Remove .git
rm -rf .git
git init

# Remove the setup script
rm build.sh
