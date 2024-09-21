# Imageviewer

Table of contents:

1. What is it?
2. How to run?
3. How to build?

## 1. What is it?

This is a simple imageviewer app with which users can view images from their devices and control the zoom and pan functions. It was build with React Native for iOS devices. An Android version is on the roadmap.

## 2. How to run?

Prerequisites:

- [React Native](https://reactnative.dev/)
- [Xcode](https://developer.apple.com/xcode/)

Read more about setting up your environment: https://reactnative.dev/docs/set-up-your-environment

1. `$ npm install`
2. `$ npx pod-install` or cd into the `ios` folder and run `$ pod install`
3. `$ npm run ios` or `$ npm run start` to start all available simulators.
4. The app is running on your preferred simulator or device, connected to Xcode.

## 3. How to build?

This app is currently only available for iOS devices. Running `$ npm run build:ios` will create a static build of the app in the `ios` folder. This can be run on your phone or in Xcode. Alternatively you can also build the app with Xcode. You can open and manage the Xcode project by opening `imageviewer.xcworkspace`, located in the `ios` folder.
