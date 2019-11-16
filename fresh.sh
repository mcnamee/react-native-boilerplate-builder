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
  echo -e "\n  ➤  What would you like the new App to be called? [eg. AwesomeProject]"
  read -p " == " APP_NAME
fi

# App Type
if [[ -z "$APP_TYPE" ]]; then
  echo -e "\n  ➤  What type of app are you wanting to build? (enter the number)"
  echo -e "\n  1. React"
  echo -e "  2. React Native \n"
  read -p " == " APP_TYPE
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
[ "$APP_TYPE" != "${APP_TYPE#[12]}" ] && APP_TYPE=1 || APP_TYPE=2

# Let's Go, Let's Go, Let's Go
# ---------------------------------------------

# Replace all of OUR files with the app name
LC_ALL=C find ./OURS -type f -exec sed -i '' 's/AwesomeProject/'"$APP_NAME"'/g' {} +
LC_ALL=C find ./OURS-NATIVE -type f -exec sed -i '' 's/AwesomeProject/'"$APP_NAME"'/g' {} +

# Install the latest React Native into a subdirectory
npx react-native init $APP_NAME

# Copy all of the files into the root
rsync -r --inplace --links --exclude '__tests__' ./$APP_NAME/. ./ && rm -rf $APP_NAME

# Install extra dependencies
yarn add @react-native-community/async-storage @rematch/core @rematch/loading @rematch/persist axios moment native-base prop-types react-native-router-flux react-native-splash-screen react-native-vector-icons react-redux redux-persist react-hook-form

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

# Jest Test Config
LC_ALL=C sed -i '' 's~"preset": "react-native"~"preset": "@testing-library/react-native", "transformIgnorePatterns": ["node_modules/(?!((jest-)?react-native|react-clone-referenced-element?/.*|react-navigation|redux-persist|native-base(-shoutem-theme)|native-base|react-native-router-flux))"]~g' package.json

# Output the next steps
# ---------------------------------------------
echo -e "----------------------------------------------------------------"
echo -e "----------------------------------------------------------------"
echo -e " "
echo -e "     ✓  Installed Successfully!"
echo -e " "
echo -e "     Please follow the instructions in README.md for next steps."
echo -e " "
echo -e "----------------------------------------------------------------"
echo -e "----------------------------------------------------------------"

# Remove the setup script
rm fresh.sh
